# Delivery Roadmap

**Status:** proposal. Sequence is driven by risk and dependencies, not calendar promises.

| Stage | Outcome | Exit evidence |
| --- | --- | --- |
| 0. Discovery | Approve terminology, scope, ownership, tenant and legal decisions. | Signed decisions, representative customer journeys, ERP contract inventory. |
| 1. Foundation | Tenant context, identity/authorization, draft/submit, scenario definition, immutable documents, workflow/return, audit. | Functional and cross-tenant tests, accessible primary flow. |
| 2. Financial/procurement | Payee/instruction, multi-payee, procurement, references, advance/settlement, and accounting profile after workflow/return foundation. | Payee totals, reference, accounting, authorization, and concurrency tests. |
| 3. Configuration | Versioned scenario/workflow/document policy, review, simulation, effective dates, and explicit pinning. | Invalid-policy, rebase, and historical-reconstruction exercises. |
| 4. Integration | Outbox, adapter, idempotency, reconciliation and exception queue. | Duplicate/timeout/recovery exercises with partner sandbox. |
| 5. Intelligence | Async document analysis, canonical extraction, deterministic checks, human review. | Privacy approval, golden dataset, measured error rates. |
| 6. Productization | Tenant inheritance, designers, entitlements, billing/metering, enterprise deployment options. | Restore, SLO evidence, isolation options, contract and license decisions. |

Do not ship a stage just because its UI is complete. The exit evidence includes security, operations, audit, and failure handling.

Workflow, return, audit, tenant context, and immutable documents belong to the foundation even if work is sequenced in smaller increments. Financial handoff cannot ship before authorization, outbox, idempotency, reconciliation, and exception handling are verified. This roadmap contains dependencies, not inherited milestones from another project.
