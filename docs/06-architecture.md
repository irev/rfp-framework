# Architecture and Technical Design

**Status:** proposal. Technology agnostic; deployment topology follows scale, team, and compliance constraints.

## Logical components

```text
Client / API
    → Identity + Authorization
    → Request Application Service → Request Domain
    → Workflow / Policy Engine
    → Document Service → Protected Object Storage
    → Audit Event Store
    → Outbox → Queue → Integration Orchestration → ERP Anti-Corruption Layer → ERP Adapter
    ← Inbox / Reconciliation ← ERP callbacks or polling
```

Start with a **modular monolith**, relational transactional core, private object storage, queue, transactional outbox, and ERP anti-corruption layer with explicit contracts. Split deployments only when independent scaling, data boundaries, or operational ownership justify the cost. Each module owns its rules and persistence access; APIs and events cross module boundaries.

## End-state architecture

The target is a logical product structure. It can run inside one modular monolith with background workers and adapters; the diagram does not mandate microservices or a particular programming language.

```text
Request context          Business context            Financial context
scope + requester        scenario + references       payee + instruction + items
            └──────────────────┬─────────────────────┘
                               ↓
                    Policy resolution engine
                value + source scope + revision
                               ↓
     Procurement ───── Document evidence ───── Workflow
     PO/contract       requirement/version/AI    definition/instance/return
            └──────────────────┬─────────────────────┘
                               ↓
                Business authorization + audit
                               ↓
              AccountingProfile (versioned)
                               ↓
      IntegrationProfile → canonical ERP command
                               ↓
           ERP anti-corruption layer / mapper
                    ↙                   ↘
                SAP adapter         Other ERP adapter

Cross-cutting: identity/authorization, tenant isolation,
transactional DB, private object storage, queue/outbox,
idempotency, observability, backup and recovery.
```

`RequestManagement`, `ScenarioCatalog`, `PayeeAndPayment`, `Procurement`, `DocumentEvidence`, `Workflow`, `Authorization`, `Accounting`, `Integration`, `TenantConfiguration`, and `AuditAndObservability` are logical bounded contexts with clear ownership. The core aggregates are `RequestForPayment`, `PaymentScenarioDefinition`, `Document`, `WorkflowDefinition`, `WorkflowInstance`, and `IntegrationSubmission`. They need not be separate deployables. A request command evaluates identity/tenant, policy and current workflow eligibility, business invariants, and optimistic version before committing state, audit, and outbox together. AI analysis and ERP delivery run asynchronously against immutable versions and are reconciled separately.

## Key contracts

| Contract | Required fields/behavior |
| --- | --- |
| Request command | Verified tenant context, authenticated actor, request ID, expected revision, intent, idempotency key. |
| Policy evaluation | Published policy version, input facts, decision, reasons, effective date. |
| Audit event | Tenant, actor, action, time, request/revision, before/after references, correlation ID. |
| ERP handoff | Tenant, immutable authorized revision, external mapping version, idempotency key, correlation ID. |
| ERP outcome | External identity, status, amount/currency, timestamp, source proof, deduplication key. |

## Data and failure handling

- Use optimistic concurrency on request revisions. Never let a late response overwrite a newer decision.
- Commit business state and an outbox record atomically; deliver asynchronously with bounded retry and a dead-letter/exception path.
- Assume at-least-once delivery and make consumers idempotent. Record uncertain external outcomes until reconciled.
- Store binary evidence outside transactional records with malware checks, access controls, checksums, immutable versions, and lifecycle policy.
- Keep source-of-truth ownership clear: request approval is local; ERP document/payment status is external unless a deployment explicitly assigns ownership otherwise.
- Partition and index tenant-owned data; every query, job, cache key, object key, and event must carry tenant identity.

## Configuration lifecycle

Draft → validate schema, references and invariants → simulate representative cases → peer review → publish immutable version/hash with effective date → monitor. A draft pins its scenario definition on creation; first submission fixes workflow/document/accounting/integration versions and required fact snapshots. Rebase or migration is explicit, authorized, and audited. Rollback selects or publishes another version; no active definition is edited.

## Interfaces

Define versioned APIs and events using standard schema artifacts (for example OpenAPI and AsyncAPI) once commands and integration contracts are approved. Avoid customer-specific fields in common contracts; use controlled extensions with validation and ownership.

## Architecture boundaries from the research basis

Use `Transport/API → Application Use Cases → Domain + Policies → Ports → Infrastructure Adapters`. The domain does not call SAP HTTP APIs, storage-specific SDKs, AI providers, or an ORM directly. Ports include `DocumentStorage`, `DocumentAnalyzer`, `ErpGateway`, `IdentityProvider`, and `NotificationGateway`.

`RequestForPayment → PaymentAuthorization → Canonical ERP Command → IntegrationProfile → ERP Anti-Corruption Layer → ERP Adapter` is the downstream chain. The profile holds a credential **reference**, mapper key, operation, route, profile version, idempotency and reconciliation strategy; final SAP object and endpoint semantics remain customer/landscape decisions. Business and integration statuses are separate.

Use versioned OpenAPI for HTTP commands, CloudEvents-compatible versioned event envelopes, and RFC 9457 problem details where HTTP applies. A business transition and outbox event commit atomically. Preserve tenant, aggregate, correlation, causation, payload hash, and schema version without sending unnecessary sensitive fields. See [data/contracts](13-data-contracts.md).

AI document workers consume version-uploaded events asynchronously, normalize provider output, run deterministic checks, and queue human review when required. They cannot authorize payment.
