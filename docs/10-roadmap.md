# Delivery Roadmap

**Status:** proposal. Sequence is driven by risk and dependencies, not calendar promises.

| Stage | Outcome | Exit evidence |
| --- | --- | --- |
| 0. Discovery | Approve terminology, scope, ownership, tenant and legal decisions. | Signed decisions, representative customer journeys, ERP contract inventory. |
| 1. Core case | Draft, classify, validate, submit, revise, store documents, audit. | Functional and cross-tenant tests, accessible primary flow. |
| 2. Workflow | Verification, return, resubmit, approval, segregation of duties. | Full decision matrix and concurrency tests. |
| 3. Configuration | Versioned policies, review, simulation, effective dates. | Invalid-policy and rollback exercises. |
| 4. ERP handoff | Outbox, adapter, idempotency, reconciliation and exception queue. | Duplicate/timeout/recovery exercises with partner sandbox. |
| 5. Productization | Tenant onboarding, operations, support, analytics, commercial packaging. | Restore exercise, SLO evidence, contract and license decisions. |
| 6. Optional AI | Assisted extraction/classification with human review. | Privacy approval and measured error evaluation. |

Do not ship a stage just because its UI is complete. The exit evidence includes security, operations, audit, and failure handling.
