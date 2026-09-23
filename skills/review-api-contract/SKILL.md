---
name: review-api-contract
description: Review a versioned API or event contract for domain clarity, access control, compatibility, retry behavior, and observable errors.
---

# Review an API or event contract

Use when a public/internal API, webhook, or event schema is designed or changed. Read the existing contract and its consumers; in `rfp-framework`, also read `docs/05-domain-model.md` and `docs/06-architecture.md`.

1. Identify the business command or event, authoritative system, actors, tenant boundary, resource identity, and revision semantics. Keep `RequestForPayment` separate from ERP-specific payment objects.
2. Check required/optional fields, validation, authorization, state preconditions, error responses, pagination or filtering where relevant, and sensitive-data exposure. Specify idempotency and replay behavior for mutation and delivery contracts.
3. Compare with the previous version for breaking changes, including semantic changes to fields or statuses. Describe compatibility and migration for each consumer rather than renaming silently.
4. Tie contract examples to testable success, invalid, unauthorized, duplicate, concurrency, timeout, and unknown-outcome cases as appropriate. Use OpenAPI, AsyncAPI, or another schema format only if it matches the interface.

Report concrete findings with affected contract paths and consequences. Do not assume a REST API when the integration is event- or file-based.

Read `docs/00-guide.md` and `docs/12-platform-rules.md` first. This is a new enterprise product baseline; do not infer rules, status meanings, or posting timing from an earlier RFP project.

For this platform, verify explicit action commands instead of status PATCH, decimal-string money fields, optimistic version conflicts, RFC 9457 errors, and event tenant/correlation/causation metadata. Read `docs/13-data-contracts.md`; never put bank details or document contents into routine events.
