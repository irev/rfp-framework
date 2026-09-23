---
name: rfp-requirements
description: Maintain this repository's BRD, PRD, SRS/FSD, and traceability when a Request for Payment feature or requirement changes.
---

# RFP requirements

Use this skill for a new product capability, changed business rule, or requirement review in `rfp-framework`. Read `docs/01-brd.md`, `docs/02-prd.md`, `docs/03-srs-fsd.md`, `docs/08-traceability.md`, and relevant entries in `docs/11-decision-log.md` before editing.

1. Identify the business outcome, actors, scope, trigger, and observable result. Separate the business need (BR), product capability (PR), and testable behavior (FR/NFR).
2. Reuse existing requirement IDs when refining the same obligation; allocate new IDs only for a distinct obligation. State acceptance examples that can fail, including invalid input, unauthorized action, or failure paths where relevant.
3. Check effects on classification, workflow, evidence, tenant policy, ERP ownership, and operations. Update only affected documents and the traceability rows connecting them.
4. Keep unapproved thresholds, role powers, retention periods, and market rules marked as proposals. Put unresolved choices in the decision log with an owner to assign. Do not silently convert a suggestion into an approved requirement.
5. Report changed IDs, proposed acceptance evidence, unresolved decisions, and any requirement that remains unmatched in traceability.

The documents are planning artifacts, not proof that an implementation exists or meets a standard. Preserve the distinction between a portal `RequestForPayment` and a downstream ERP `PaymentRequest`.
