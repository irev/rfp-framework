# PRD — Product Requirements

**Status:** proposal. **Audience:** product, design, engineering, customer implementation.

## Personas and jobs

| Persona | Job |
| --- | --- |
| Requester | Prepare, save, submit, and track a payment case; correct returned requests. |
| Verifier | Check evidence, classification, amounts, and policy; return with specific reasons. |
| Approver | Decide within authority based on a frozen case snapshot. |
| Finance operations | Reconcile authorized cases with ERP/payment outcomes. |
| Tenant administrator | Manage approved policy configuration with review and effective dates. |
| Auditor | Reconstruct who changed or decided what, when, and using which evidence. |

## Product capabilities

| ID | Capability | Initial release intent |
| --- | --- | --- |
| PR-01 | Draft, submit, return, correct, resubmit, withdraw where allowed | Foundation |
| PR-02 | Independent classification dimensions and extensible scenarios | Foundation |
| PR-03 | Required document matrix, upload, replacement, version history | Foundation |
| PR-04 | Role and policy based work queues, verification, approval | Foundation |
| PR-05 | Immutable audit events and case timeline | Foundation |
| PR-06 | Versioned tenant configuration, validation, publication, rollback | Foundation |
| PR-07 | ERP adapter, outbox, retry, reconciliation | After core workflow |
| PR-08 | Optional document extraction and review assistance | Later; human decision remains authoritative |

## Release gates

Foundation cannot release until tenant isolation, access control, transition integrity, audit, document access, and restore procedures are tested. An ERP integration cannot release until duplicate delivery and uncertain-response recovery are exercised. An AI document feature cannot release until data handling, evaluation, human review, and false-result behavior are defined.

## Explicit non-goals for the first release

Bank payment execution, generic accounting ledger ownership, automatic approval by AI, and a universal ERP schema. These can become separate capabilities after product and responsibility decisions.

## Open product choices

See `DEC-01` through `DEC-07` in [decision log](11-decision-log.md). These include visibility/licensing, target markets, tenant model, workflow flexibility, and retention policy.
