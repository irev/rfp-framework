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
    → Outbox → ERP Adapter → ERP/SAP
    ← Inbox / Reconciliation ← ERP callbacks or polling
```

Start with a modular application and explicit contracts. Split deployments only when independent scaling, data boundaries, or operational ownership justify the cost. Each module owns its rules and persistence access; APIs and events cross module boundaries.

## Key contracts

| Contract | Required fields/behavior |
| --- | --- |
| Request command | Tenant, actor, request ID, expected revision, intent, idempotency key. |
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

Draft → validate schema and invariants → simulate representative cases → peer review → publish with effective date → monitor → rollback through a new version. Existing submissions remain bound to the policy version used at submission unless an explicit migration is approved and audited.

## Interfaces

Define versioned APIs and events using standard schema artifacts (for example OpenAPI and AsyncAPI) once commands and integration contracts are approved. Avoid customer-specific fields in common contracts; use controlled extensions with validation and ownership.
