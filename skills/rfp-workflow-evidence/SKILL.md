---
name: rfp-workflow-evidence
description: Design or review Request for Payment lifecycle changes, approval roles, returns, resubmissions, and supporting-document versions.
---

# RFP workflow and evidence

Read `docs/03-srs-fsd.md`, `docs/04-ui-ux-user-flows.md`, `docs/07-security-operations.md`, and the relevant scenario in `docs/05-domain-model.md`.

- For each proposed transition, specify source and target state, actor and authority, preconditions, effect, concurrency rule, idempotency behavior, audit event, and failure response. Treat the lifecycle in SRS/FSD as proposed until approved.
- Freeze submitted facts and evidence into a revision. A return states what must change; correction and resubmission create a new revision without erasing the prior decision context.
- Define document requirements by effective policy version. Reupload creates a new immutable version, with checksum, scan status, access rules, and a link to the request revision using it.
- Check segregation of duties, tenant and file access, role changes during an active case, and actions submitted concurrently. The server enforces authority; a hidden UI control is insufficient.
- Keep authorization, ERP integration, and settlement statuses distinct. A portal approval alone is not proof that money was paid.

Produce a compact transition table, affected evidence/version rules, acceptance scenarios, and open decisions. Do not infer a customer's accounting or commitment timing from generic state names.
