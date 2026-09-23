# Payment Scenario Onboarding and Productization

**Status:** proposed operating procedure derived from the owner-provided research report. Examples are illustrative and do not inherit rules, statuses, or database semantics from an earlier project.

## Business classification first

For every request, record `RequestScope`, `PaymentScenario`, `ProcurementContext`, `PayeeType`, optional `VendorClassification`, `PaymentStructure`, and relevant `BusinessReference`. `PaymentScenario` is the business reason: examples include `VENDOR_INVOICE`, `EMPLOYEE_REIMBURSEMENT`, `EMPLOYEE_BENEFIT`, `HONORARIUM`, `ADVANCE`, `ADVANCE_SETTLEMENT`, `UTILITY_PAYMENT`, `REFUND`, and `REGULATORY_PAYMENT`. These are proposed catalog entries, not a mandatory enum for every tenant.

`VENDOR_INVOICE + PO_BASED` and `VENDOR_INVOICE + NON_PO` can use one scenario with different procurement context. `ONE_TIME_VENDOR` classifies a vendor. `MULTI_PAYEE` describes payment structure and may require a reusable capability. `ADVANCE_SETTLEMENT` can warrant a separate scenario because it references an originating advance and must enforce outstanding-balance rules.

## Decision tree: classification before implementation

```text
New business requirement
  ├─ Existing PaymentScenario already represents the business purpose?
  │    ├─ Yes → Only allowed values, thresholds, documents, actors or routes differ?
  │    │         ├─ Yes → Versioned configuration
  │    │         └─ No → Reusable behavior across scenarios?
  │    │                   ├─ Yes → Shared capability
  │    │                   └─ No → Named scenario policy/handler for the invariant
  │    └─ No → Fundamentally different purpose, lifecycle or accounting meaning?
  │              ├─ Yes → New PaymentScenario
  │              └─ No → Correct the classification; reassess config/capability/policy
  └─ Every branch → Verify P0 guarantees remain enforced by core code
```

The output is a decision record: business purpose, existing scenario comparison, chosen branch and rationale, impacted definitions and versions, rejected alternatives, owner, and acceptance tests. A new form or document type alone never proves the need for a new scenario. If a proposed handler crosses an established scenario boundary, reopen the scenario decision. This is a **design decision tree**, not a runtime rule engine.

## Required onboarding sequence

| Stage | Required output |
| --- | --- |
| Discover | Business purpose, owner, requester, beneficiary, completion meaning |
| Classify | Independent dimensions and existing scenario comparison |
| Analyze references | Relations to request, procurement, accounting, and external objects |
| Map capabilities | Existing reusable behavior or justified new capability/handler |
| Define policies | Required data/documents, workflow/actors, returns, authorization, accounting, ERP route |
| Validate | Schema, cross-references, invariants, positive/negative authorization, tenant isolation, concurrency, integration contract, UAT |
| Publish | Reviewed immutable version, hash, effective date, controlled rollout |
| Observe | Return reasons, exceptions, integration failures, cycle times; propose a new version for changes |

When a business purpose already exists, first decide whether a permitted configuration value is enough. If behavior repeats across scenarios, design a capability. If a unique invariant remains, use a named policy or handler. Create a new scenario only when purpose, lifecycle, or accounting meaning truly differs.

## Publication and observation gates

Before publication, check unique code and monotonic version; known capabilities and valid capability configuration; registered handler when specified; active document/workflow/accounting/integration references; reachable workflow terminal paths; resolvable actors; coherent return/resubmit; valid API/event/schema contracts; unknown-key rejection; definition hash; tenant/authorization negative tests; and ERP mapping/UAT where applicable. Record reviewer, effective date, rollout scope, rollback choice, and monitoring owner. An active definition is never edited; changes create another version. Requests keep their pinned definitions and historical snapshots unless a controlled migration is approved.

After rollout, review return reasons, unresolved corrections, workflow exceptions, integration failure and reconciliation age, and AI correction rate where enabled. Observation can trigger a new draft version; it does not rewrite historical decisions.

## Definition of done for an active scenario

- Business owner and purpose are recorded; all classification dimensions and references are clear.
- Capabilities and scenario-specific invariants are identified and tested.
- Document, workflow, accounting, and integration definitions are versioned and valid; return/resubmit behavior is coherent.
- Authorization and separation-of-duties rules have positive and negative tests.
- API and event contracts, cross-tenant checks, ERP retry/reconciliation tests, and business UAT pass where applicable.
- The definition is immutable after publication and its monitoring/exception owner is known.

## Product boundary and packaging

Maintain one shared platform core. Customer differences use versioned configuration and controlled capability, scenario handler, ERP, identity, or document analyzer adapters. Avoid customer forks. A possible commercial packaging model has Core, Professional, Enterprise, AI Intelligence, and Integration add-ons; tier boundaries, metering, and dedicated deployment options are **open product decisions**, not architecture invariants. Candidate metering includes users, monthly requests, document storage/pages, AI usage, ERP transactions, and API volume. Pricing by scenario count can distort the taxonomy and should be reviewed carefully.

The [roadmap](10-roadmap.md) sequences foundation, financial/procurement, integration, intelligence, and productization. The [platform rules](12-platform-rules.md) remain binding design constraints in every tier.
