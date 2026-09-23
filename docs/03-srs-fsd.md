# SRS/FSD — Software and Functional Specification

**Status:** proposal. Requirement IDs are stable references for acceptance tests. Specific thresholds and policy values are open until approved.

## Functional requirements

| ID | Requirement | Acceptance example |
| --- | --- | --- |
| FR-01 | Create a `RequestForPayment` draft with tenant, requester, purpose, currency, amount, and classification. | Authorized requester saves a valid draft and retrieves it in the same tenant. |
| FR-02 | Validate a proposed submission against the effective configuration and core invariants. | Missing required evidence blocks submit and identifies each missing item. |
| FR-03 | Freeze a submission revision when submitted. | Subsequent correction creates a new revision; prior decision inputs remain available. |
| FR-04 | Resolve the next workflow actors from a published policy and current organizational context. | A user without the required authority cannot act even if a client sends a crafted request. |
| FR-05 | Return a case with explicit reasons and affected fields/documents. | The requester sees reasons and can resubmit; the earlier revision remains visible to authorized auditors. |
| FR-06 | Record decisions with actor, role, timestamp, outcome, reason, policy version, and evidence revision. | Timeline can reconstruct the decision context. |
| FR-07 | Upload/reupload documents with immutable versions and content checks. | Replacement becomes current while the old version stays available under retention policy. |
| FR-08 | Link a settlement/adjustment request to its originating advance where required. | A settlement cannot reference another tenant’s case or exceed approved business constraints. |
| FR-09 | Publish tenant policy only after schema validation, conflict checks, review, and effective date. | Invalid or overlapping policy is rejected; active cases retain the policy version bound at submission. |
| FR-10 | Emit authorized payment handoff through an idempotent integration boundary. | Retried delivery with the same key creates no duplicate downstream request. |
| FR-11 | Reconcile ERP callbacks or polls against the original handoff. | Unknown or contradictory outcomes enter an exception queue, never silently overwrite case history. |
| FR-12 | Expose separate queues for drafts, assigned work, returned cases, completed cases, and integration exceptions. | Users see only tenant and role-authorized records. |

## Nonfunctional requirements

| ID | Requirement | Verification approach |
| --- | --- | --- |
| NFR-01 | Enforce tenant isolation in storage, queries, jobs, documents, cache, and integrations. | Cross-tenant adversarial tests and code review. |
| NFR-02 | Enforce server-side authorization and segregation of duties. | Transition and role matrix tests. |
| NFR-03 | Preserve tamper-evident audit history and document provenance. | Audit completeness and controlled mutation tests. |
| NFR-04 | Handle retries, concurrency, and partial integration failure safely. | Duplicate, race, timeout, and recovery tests. |
| NFR-05 | Meet agreed accessibility and localization requirements. | Keyboard/screen-reader review and localized content checks. |
| NFR-06 | Define measurable latency, availability, RPO/RTO, retention, and data residency targets per deployment. | Operational acceptance plan after `DEC-06` and `DEC-07`. |

## Lifecycle contract

Candidate states: `DRAFT → SUBMITTED → IN_VERIFICATION → IN_APPROVAL → AUTHORIZED → INTEGRATION_PENDING → INTEGRATED → SETTLED`; `RETURNED`, `WITHDRAWN`, and `REJECTED` are controlled side paths. This is a proposed model, not a universal status mapping. Every transition must declare actor, preconditions, effect, concurrency rule, idempotency key, and audit event. `AUTHORIZED` does not mean paid; `SETTLED` requires a defined external evidence source.
