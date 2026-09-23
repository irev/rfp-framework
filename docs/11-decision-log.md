# Decision Log and Open Questions

**Status:** open proposals. Assign an owner, date, rationale, and ADR when each decision is approved.

| ID | Decision to make | Proposed starting point | Owner/status |
| --- | --- | --- | --- |
| DEC-01 | Repository/site visibility and license | Repository and GitHub Pages are public by owner request on 2026-09-24. License and reuse rights remain undecided; no license grant yet. | Owner: repository owner / Visibility decided; license open |
| DEC-02 | Initial market, sectors, and jurisdictions | Choose one pilot segment and document regulatory constraints. | Product: TBD / Open |
| DEC-03 | Tenant isolation model | Logical isolation with explicit tenant keys and adversarial tests; evaluate stronger isolation where contracts require it. | Architecture/security: TBD / Open |
| DEC-04 | Portal vs ERP ownership of accounting, payment request, and settlement | Portal owns business case; ERP owns financial execution and authoritative payment outcome. | Finance/ERP: TBD / Open |
| DEC-05 | Workflow variability and policy authoring rights | Versioned policy within fixed core transition/authorization guarantees. | Product/risk: TBD / Open |
| DEC-06 | Availability, latency, RPO/RTO, reconciliation SLA | Set measurable targets after pilot volume and failure analysis. | Operations: TBD / Open |
| DEC-07 | Retention, data residency, accessibility, AI data processing | Establish per-market baseline and customer contract constraints. | Legal/security: TBD / Open |
| DEC-08 | Advance settlement and multi-payee constraints | Define amount, currency, partial settlement, and reference rules with finance. | Finance: TBD / Open |

No row is an approved requirement until its owner records a decision. Avoid burying customer exceptions in shared code or using configuration as a way around core guarantees.
