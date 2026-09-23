# Requirements Traceability

**Status:** proposal. Update this matrix whenever a requirement, design, or test changes.

| Business | Product | Specification | Design area | Acceptance evidence |
| --- | --- | --- | --- | --- |
| BR-01 | PR-01, PR-02, PR-03 | FR-01, FR-02, FR-03, FR-07 | Request, Classification, Documents | Draft/submit/document tests |
| BR-02 | PR-02 | FR-01, FR-02 | Classification, Policy | Internal/external scenario matrix |
| BR-03 | PR-04 | FR-04, FR-06; NFR-02 | Workflow, Authorization | Delegation and self-approval tests |
| BR-04 | PR-01, PR-03, PR-05 | FR-03, FR-05, FR-07 | Revision, Documents, Audit | Return/resubmit history tests |
| BR-05 | PR-07 | FR-10, FR-11; NFR-04 | Outbox, ERP Adapter | Duplicate/retry/reconcile tests |
| BR-06 | PR-06 | FR-09; NFR-01 | Tenant Policy | Isolation and policy version tests |
| BR-07 | PR-05 | FR-06; NFR-03 | Audit | Timeline reconstruction test |

`FR-08` (advance settlement link), `FR-12` (queues), and `NFR-05/06` require stakeholder confirmation and detailed acceptance plans. Record approved changes with decision IDs and owner; do not silently remove unmatched requirements.
