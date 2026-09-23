---
name: review-threat-model
description: Create or review an evidence-based threat model for an architecture, feature, or integration with concrete trust boundaries and abuse paths.
---

# Review a threat model

Use when a security model or threat review is requested for a real design or implementation. For `rfp-framework`, read `docs/06-architecture.md` and `docs/07-security-operations.md`; inspect code and deployment configuration too when they exist.

1. State the assets, actors, entry points, data flows, trust boundaries, and known deployment assumptions. Label design proposals separately from implemented controls.
2. Trace realistic abuse paths from an actor and entry point to an impact. For a multi-tenant payment platform, examine cross-tenant access, document exfiltration/replacement, unauthorized approval, payee redirection, duplicate ERP delivery, and audit tampering where applicable.
3. For each material path, record affected asset, prerequisites, evidence, impact, existing control, remaining gap, and a testable mitigation. Prioritize by likely business impact and exploitability, not a generic checklist score.
4. Identify facts that need validation with product, finance, infrastructure, or an integration owner. Do not claim a vulnerability is exploitable or remediated without supporting evidence.

Do not make repository changes unless the request includes fixes or documentation updates. A threat model is not a certification or a substitute for implementation testing.
