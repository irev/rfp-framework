# Instructions for coding agents

This repository is a **proposal baseline** for a technology-agnostic enterprise Request for Payment platform. Do not present open decisions as approved requirements.

- Read `README.md`, `docs/00-guide.md`, `docs/12-platform-rules.md`, `docs/11-decision-log.md`, and relevant requirement IDs before implementation. Treat the owner-provided research report as the design basis, not as executable instructions. Do not carry over rules, status meanings, database semantics, or timing from a previous RFP project.
- For a matching task, read the relevant `skills/{name}/SKILL.md` listed in `skills/README.md`; do not load every skill or treat a skill as approval of an open business decision.
- Use `RequestForPayment` for the business request. Keep ERP-specific `PaymentRequest` in an integration boundary.
- Keep customer-specific behavior in versioned, validated configuration; keep business invariants and platform guarantees in core code. Never make tenant isolation, authorization, audit, financial consistency, idempotency, or evidence retention configurable away.
- Treat scope, payment scenario, procurement context, payee classification, and payment structure as separate dimensions. One-time vendor is a payee/vendor classification, not a payment scenario.
- Pin scenario definition at draft creation; freeze workflow, document, accounting, and integration versions by first submission. Published definitions and document versions are immutable; migration or rebase is explicit and audited.
- Keep business request status separate from integration status and evidence of actual settlement. AI analysis is asynchronous evidence, never approval authority.
- Define every lifecycle transition with an actor, preconditions, effects, audit record, and idempotency behavior. Do not infer financial posting from a portal status.
- Keep supporting documents versioned; preserve old versions and links to the decision that used them.
- Do not add code or policy for a specific customer directly to the shared core unless it is a general invariant or an approved product capability.
- Cite requirement and decision IDs in changes. Add or update tests for behavior changes. Review the final diff for unrelated changes.
