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

## Research-derived mapping

| Business | Product | Specification | Design area | Acceptance evidence |
| --- | --- | --- | --- | --- |
| BR-08 | PR-06, PR-09, PR-11 | FR-09, FR-13, FR-14, FR-19 | Configuration, versioning, scenario onboarding | Publish/rebase/provenance reconstruction tests |
| BR-03 | PR-04, PR-10 | FR-15, FR-16 | Authorization, workflow, separate state machines | Ineligible-actor and state-separation tests |
| BR-04 | PR-03, PR-05 | FR-17, FR-18 | Document evidence, AI, return | Version/baseline/human-review tests |
| BR-09 | PR-07, PR-10 | FR-10, FR-11, FR-16, FR-20; NFR-07 | Outbox, ERP ACL, reconciliation | Duplicate/timeout/crash/structured-error tests |
| BR-10 | PR-08 | FR-17; NFR-08, NFR-09 | AI provenance, privacy, observability | Golden-document, redaction, trace tests |

`FR-08` advance settlement, `FR-12` queues, and numeric `NFR-06` targets still require owner decisions. IDs above are proposals until approved.
