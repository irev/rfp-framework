# SRS/FSD — Software and Functional Specification

**Status:** proposal. Requirement IDs are stable references for acceptance tests. Specific thresholds and policy values are open until approved.

## Functional requirements

| ID | Requirement | Acceptance example |
| --- | --- | --- |
| FR-01 | Create a `RequestForPayment` draft with tenant, requester, purpose, currency, amount, and classification. | Authorized requester saves a valid draft and retrieves it in the same tenant. |
| FR-02 | Validate a proposed submission against the effective configuration and core invariants. | Missing required evidence blocks submit and identifies each missing item. |
| FR-03 | Freeze a submission revision when submitted. | Subsequent correction creates a new revision; prior decision inputs remain available. |
| FR-04 | Resolve the next workflow actors from a published policy and current organizational context. | A user without the required authority cannot act even if a client sends a crafted request. |
| FR-05 | Return a case to a valid configured workflow target with explicit reasons and affected fields/documents. | The eligible target actor sees the reasons and can correct or route the case according to policy; the earlier revision remains visible to authorized auditors. |
| FR-06 | Record decisions with actor, role, timestamp, outcome, reason, policy version, and evidence revision. | Timeline can reconstruct the decision context. |
| FR-07 | Upload/reupload documents with immutable versions and content checks. | Replacement becomes current while the old version stays available under retention policy. |
| FR-08 | Link a settlement/adjustment request to its originating advance where required. | A settlement cannot reference another tenant’s case or exceed approved business constraints. |
| FR-09 | Publish tenant policy only after schema validation, conflict checks, review, and effective date. | Invalid or overlapping policy is rejected; drafts retain their pinned scenario definition; submitted cases retain explicitly bound policy versions. |
| FR-10 | Emit authorized payment handoff through an idempotent integration boundary. | Retried delivery with the same key creates no duplicate downstream request. |
| FR-11 | Reconcile ERP callbacks or polls against the original handoff. | Unknown or contradictory outcomes enter an exception queue, never silently overwrite case history. |
| FR-12 | Expose authorized query views for drafts, assigned work, returned cases, completed business cases, and integration exceptions over the same case/workflow records. | Users see only tenant and role-authorized records; a view does not create another business aggregate. |

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

Keep **separate** business and integration state machines. Proposed business states are `DRAFT → SUBMITTED → IN_REVIEW → APPROVED → COMPLETED`, with controlled `RETURNED`, `REJECTED`, and `CANCELLED` paths. Proposed integration states are `PENDING → READY → QUEUED → SENT → ACCEPTED → RECONCILED`, with `FAILED` and `RETRYING` paths. Final names, terminal meaning, and completion evidence remain open decisions. Every transition declares actor, preconditions, effects, concurrency rule, idempotency behavior, and audit event. `APPROVED` does not mean paid; an external outcome requires its own evidence contract.

## Additional functional requirements from the research basis

| ID | Requirement | Acceptance example |
| --- | --- | --- |
| FR-13 | Pin scenario definition at draft creation and explicitly bind workflow, document, accounting, and integration definitions by first submission. | Publishing a new definition never silently changes a draft or submitted case; an authorized pre-submit rebase records the old/new versions. |
| FR-14 | Publish only immutable definitions with schema, reference, capability, workflow graph, actor, and effective-date validation. | Invalid actor resolution or unknown config keys block publication; a changed active definition creates a new version and hash. |
| FR-15 | Enforce action permission as tenant access AND resource authorization AND workflow eligibility AND business rules AND concurrency. | A user with generic `approve` permission but not assigned to the active step receives denial. |
| FR-16 | Keep business request, integration submission, and settlement evidence separate. | ERP failure does not rewrite an approved business request into a combined status; UI shows both timelines. |
| FR-17 | Process document analysis asynchronously with source version, provider/model/schema provenance, deterministic validation, and human review. | Upload succeeds independently of AI; low-confidence or failed analysis cannot auto-approve. |
| FR-18 | Return targeted corrections using `ReturnCase` and `ReturnItem` baselines. | Reupload creates a new version; a return item closes only after a valid correction against the recorded baseline. |
| FR-19 | Resolve tenant policy with source scope, config revision, and effective time. | Past approval decisions can be reconstructed after a legal-entity override changes. |
| FR-20 | Use explicit state commands, decimal-string API amounts, optimistic versions, structured errors, and versioned API/event schemas. | Direct status patch and stale version are rejected without mutating state. |

## Additional nonfunctional requirements

| ID | Requirement | Verification approach |
| --- | --- | --- |
| NFR-07 | Atomic business/outbox persistence and safe recovery from publication crashes. | Crash before/after publish, replay, and deduplication tests. |
| NFR-08 | Preserve secrets and bank details outside routine logs and restrict access to sensitive snapshots. | Redaction, secret rotation, and field-access tests. |
| NFR-09 | Propagate trace/correlation IDs through API, queue, AI, and ERP without exposing personal or financial data. | Cross-component trace and log review. |

These are product requirements for the new platform; no status or field semantics are inherited from an earlier implementation. See [platform rules](12-platform-rules.md) and [data contracts](13-data-contracts.md).
