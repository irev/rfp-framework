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

## Additional research decisions

| ID | Decision to make | Proposed starting point | Owner/status |
| --- | --- | --- | --- |
| DEC-09 | Tenant hierarchy and isolation deployment options | Support verified tenant context; decide shared DB/schema, tenant DB, dedicated deployment, or hybrid by contract. | Architecture/security: TBD / Open |
| DEC-10 | SAP edition, release, API/IDoc/RFC route, and object mapping | Keep canonical command and ACL; validate exact customer landscape before mapping. | ERP/finance: TBD / Open |
| DEC-11 | AI provider, allowed data boundary, review thresholds, golden dataset | Optional async enrichment with human authority. | Product/security: TBD / Open |
| DEC-12 | SaaS tiers, entitlements, metering, dedicated deployment offer | Packaging is commercial policy; never weaken platform guarantees by tier. | Product/commercial: TBD / Open |
| DEC-13 | Business completion, integration reconciliation, and settlement evidence | Define each status and authoritative evidence independently. | Finance/operations: TBD / Open |
| DEC-14 | Minimum fields to create an incomplete draft and partial-update contract | Allow early draft creation before document upload; define field validation boundaries and conflict behavior before finalizing API/schema. | Product/API: TBD / Open |

No decision imports rules or timing from an earlier RFP implementation. The [research basis](00-guide.md) controls scope; examples in that report are illustrative.
