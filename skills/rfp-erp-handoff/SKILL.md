---
name: rfp-erp-handoff
description: Design or review the boundary between an authorized RequestForPayment case and ERP payment/accounting integration.
---

# RFP to ERP handoff

Use this skill for SAP or other ERP adapters, callbacks, polling, retries, and reconciliation. Read `docs/06-architecture.md`, `docs/03-srs-fsd.md`, `docs/07-security-operations.md`, and `DEC-04` in `docs/11-decision-log.md`.

1. State which system owns the business request, authorization, accounting document, payment instruction, and final settlement evidence. Use ERP terminology only as defined by the target adapter; do not equate a portal `RequestForPayment` with an ERP `PaymentRequest`.
2. Define the handoff from an immutable authorized revision: tenant, case ID, revision, amount/currency, payee/instructions, mapping version, correlation ID, and idempotency key. Specify validation and who can initiate or retry it.
3. Commit business state and an outbox record atomically. Model at-least-once delivery, timeout after remote acceptance, duplicate callback, partial rejection, and operator recovery without creating a second payment.
4. Reconcile each external identity and outcome against the original handoff. Route unknown, mismatched, or contradictory outcomes to an exception queue with audit evidence; do not silently advance to `SETTLED`.
5. Verify the contract with representative retries and failures in a partner sandbox before claiming integration readiness. Record adapter-specific mappings outside the shared business model.

Never invent SAP endpoint semantics, posting timing, or payment status meaning. Mark unavailable contracts as open decisions.
