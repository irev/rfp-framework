# Data Model, API, and Event Contracts

**Status:** proposed logical contracts, not final SQL, OpenAPI, or ERP mapping. Identifiers and field names are English; labels can be localized. The platform remains independent of language, framework, ERP, and deployment topology.

## Aggregate ownership

| Aggregate | Owns |
| --- | --- |
| `RequestForPayment` | Business case, classification, payees, instructions, references, submission revisions, permitted state changes |
| `PaymentScenarioDefinition` | Immutable published scenario version and capability/policy references |
| `Document` | Immutable `DocumentVersion` history and current pointer |
| `WorkflowDefinition` | Versioned steps, transitions, actor resolution rules |
| `WorkflowInstance` | Current step, optimistic version, action history and return cases |
| `IntegrationSubmission` | One logical ERP operation, attempts, external identity, reconciliation |

Payee, payment instruction, return case, and business reference can begin inside the request boundary. Extract an independent aggregate only for a demonstrated lifecycle, concurrency, scale, or ownership need.

## Logical records and mandatory links

| Group | Records and essential links |
| --- | --- |
| Organization | `Tenant`, optional `LegalEntity`, optional `BusinessUnit`; tenant-scoped records carry verified `tenantId` conceptually even with physical isolation |
| Configuration | `PaymentScenario`, `PaymentScenarioDefinition`, `ScenarioCapability`, `DocumentPolicy`, `WorkflowDefinition`, `AccountingProfile`, `IntegrationProfile`, `TenantConfigOverride`; each published definition has version, status, effective period, hash and owner |
| Request | `RequestForPayment`, `RequestPayee`, `PaymentInstruction`, `PaymentItem`, `BusinessReference`; money is decimal/fixed-point with currency and a checked sum of items |
| Evidence | `RequestDocumentRequirement` snapshot, `Document`, immutable `DocumentVersion` with checksum/storage key, `DocumentAnalysis` tied to one version |
| Workflow | `WorkflowInstance`, `WorkflowHistory`, `ReturnCase`, `ReturnItem`; preserve from/to step, actor snapshot, reason, targeted field/document/item and baseline version |
| Delivery | `IntegrationSubmission`, `OutboxEvent`, `IdempotencyRecord`, `AuditEvent`; retain profile version, canonical payload hash, correlation ID, attempt and external identity |

Document storage keys and bank details need restricted access. Secrets remain in a secret manager; configuration stores references only. A canonical outbound ERP command/snapshot is stored or hashed so an integration attempt can be reconstructed without treating vendor DTOs as domain data.

## Example: create request

Amounts cross JSON boundaries as decimal strings; calculations use decimal/fixed-point semantics. This example shows independent classification dimensions, not a universal required field set.

```json
{
  "scenarioDefinitionId": "scenario-version-4",
  "requestScope": "INTERNAL",
  "procurementContext": "NON_PO",
  "paymentStructure": "SINGLE_PAYEE",
  "businessPurpose": "Payment for an approved service",
  "money": { "amount": "1250000.00", "currency": "IDR" },
  "organizationContext": { "legalEntityId": "entity-01" },
  "payees": [{ "payeeType": "VENDOR", "vendorClassification": "ONE_TIME_VENDOR", "name": "Example supplier" }]
}
```

The published scenario definition declares allowed scopes, procurement contexts, payee types, capabilities, document and workflow references, and optional accounting/integration references. Start with the proposed machine-readable examples in `schemas/`; validate its structure with a machine-readable schema, reject unknown keys, and run cross-reference/behavior checks before publication. A schema alone cannot prove that actors resolve or that every workflow branch terminates.

## HTTP command contract

Define and release a versioned OpenAPI contract. Candidate endpoints are `POST /api/v1/requests-for-payment`, `GET/PATCH /api/v1/requests-for-payment/{id}` for allowed editable fields, and explicit `POST .../{id}/actions/{submit|approve|return|resubmit|reject|cancel}` commands. Add timeline, documents/versions, scenario definitions, admin publish, and integration status/retry endpoints only with corresponding authorization rules.

Every state-changing command identifies the authenticated actor and resolved tenant, checks expected aggregate version, and has an idempotency contract. Do not accept `PATCH { "status": "APPROVED" }`. Return stale-write and invalid-transition conflicts as structured Problem Details errors (RFC 9457), with a correlation ID and no sensitive data.

## Event contract

Write state change and outbox event in one database transaction. Publish at least once; consumers deduplicate. A CloudEvents-compatible envelope includes event ID, type and schema version, source, subject/aggregate ID, time, tenant ID, correlation/causation IDs, and minimal non-sensitive data. Event names describe past facts, for example `com.product.rfp.request.submitted.v1` or `com.product.rfp.document.version-uploaded.v1`.

For each ERP operation, retain a stable logical idempotency key across retries, request and integration profile versions, operation name, payload hash, attempt count, correlation ID, external document ID, and last error. After an uncertain timeout, reconcile the remote side before attempting another financial side effect. A duplicate callback cannot overwrite a newer or contradictory outcome.

## Document and AI records

Upload proceeds through authorization, type/size/signature validation, quarantine, scan, private immutable storage, version record, and optional asynchronous analysis. Reupload creates a new version; it never overwrites the prior binary. A `ReturnItem` is resolved only after a permitted correction against its recorded baseline.

`DocumentAnalysis` records `documentVersionId`, provider/model, analysis and schema versions, status, normalized fields with confidence and evidence references, deterministic validation results, human review outcome, and protected raw artifact reference if needed. Provider output is not canonical business truth.

## Reference specifications

Use [OpenAPI](https://spec.openapis.org/oas/latest) for HTTP contracts, [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12) for JSON validation, [CloudEvents](https://cloudevents.io/) for event envelopes, and [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457) for HTTP problem details. The exact contract versions are release decisions; this blueprint does not claim implementation or certification.
