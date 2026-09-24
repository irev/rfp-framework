# Domain Model and Classification

**Status:** proposal. `RequestForPayment` is the business aggregate, not an ERP payment object.

## Bounded contexts

Eleven logical bounded contexts: `RequestManagement`, `ScenarioCatalog`, `PayeeAndPayment`, `Procurement`, `DocumentEvidence`, `Workflow`, `Authorization`, `Accounting`, `Integration`, `TenantConfiguration`, and `AuditAndObservability`. They are ownership boundaries inside an initial modular monolith, not eleven microservices.

## Aggregate and relationships

```text
RequestForPayment
├── identity, tenant, requester, purpose, amount/currency
├── classification and scenario-specific data
├── payees and proposed payment instructions
├── references (e.g. advance → settlement)
├── submission revisions and workflow references
├── supporting document references and versions
└── integration references
```

The aggregate controls allowed state changes and consistency of its own revision. Documents may be stored separately but must be bound to a request revision and protected by the same tenant and authorization policies.

## Independent classification dimensions

| Dimension | Example values | Meaning |
| --- | --- | --- |
| `requestScope` | `INTERNAL`, `EXTERNAL` | Origin/context of the requester, independent of the payee type. An internal requester may pay a vendor. |
| `paymentScenario` | `VENDOR_INVOICE`, `EMPLOYEE_REIMBURSEMENT`, `EMPLOYEE_BENEFIT`, `HONORARIUM`, `ADVANCE`, `ADVANCE_SETTLEMENT`, `UTILITY_PAYMENT`, `REFUND`, `REGULATORY_PAYMENT`, `OTHER_PAYMENT` | Business reason and lifecycle rules. |
| `procurementContext` | `PO_BASED`, `CONTRACT_BASED`, `NON_PO`, `NO_PROCUREMENT` | Source of procurement commitment/evidence. |
| `payeeType` | `VENDOR`, `EMPLOYEE`, `INDIVIDUAL`, `GOVERNMENT`, `ORGANIZATION`, `OTHER` | Party receiving payment. |
| `vendorClassification` | `REGISTERED_VENDOR`, `ONE_TIME_VENDOR` | Vendor master relationship; applicable only to vendor payees. |
| `paymentStructure` | `SINGLE_PAYEE`, `MULTI_PAYEE` | Number of beneficiaries/instructions. |

`ONE_TIME_VENDOR` is **not** a payment scenario. A transfer list is a payment structure/data capability, not a reason for payment. “Other payment” needs controlled free-form description, risk review, and eventual reclassification criteria.

## Variants, procurement matching, and rule layers

`ScenarioVariant` is optional: use it for a meaningful subcategory of an existing business purpose, not as a place for unrelated technical, payee, or procurement differences. `ProcurementContext` is first-class; a `MatchingPolicy` such as `NO_MATCH`, `TWO_WAY`, or `THREE_WAY` can select the required PO, receipt/service-entry, and invoice evidence according to a validated definition. Do not collapse these into `isPo` or a new payment scenario.

Apply rules in three layers: **core invariants** for every request, reusable **capability rules** (for example, multi-payee item sum equals the request total), and named **scenario policies/handlers** for genuinely unique invariants (for example, advance settlement cannot exceed outstanding balance). Configuration supplies permitted values and references; it must not execute arbitrary expressions or replace those code-owned rules.

Payee/master data may be looked up from another system; capture protected identity and payment snapshots at the agreed lifecycle boundary so later master changes do not silently rewrite a historical decision. `Payment To` is a possible UI label for a payee selection, not a separate domain type.

## New scenario intake contract

Before adding a scenario, define: identity and purpose; permitted scopes; requester and payee; data and references; required documents; validations; workflow; authorization; ERP mapping; and completion evidence. Prefer a new configuration profile when the difference is an allowed policy variation. Add core behavior only when the domain invariant or a general product capability truly changes.

## Core vs configuration examples

| Core code | Versioned tenant configuration |
| --- | --- |
| Tenant isolation, authorization, state transitions, audit integrity, document provenance, idempotency, amount/currency consistency | Required document matrix, allowed scenarios, field visibility, approval thresholds, routing rules, labels, ERP code mapping |

A configuration engine may select among permitted transitions; it cannot create an unaudited transition or bypass segregation of duties. Validate configuration against a schema and simulate it before publication.

## Aggregate boundaries and reusable behavior

The core aggregates are `RequestForPayment`, versioned `PaymentScenarioDefinition`, `Document`, versioned `WorkflowDefinition`, runtime `WorkflowInstance`, and `IntegrationSubmission`. Payee, payment instruction, return case, and business reference can remain inside the request boundary until independent lifecycle or concurrency needs justify extraction.

`Capability` is reusable behavior such as `MULTI_PAYEE`, `REFERENCE_REQUEST`, `SETTLEMENT`, `ONE_TIME_VENDOR_DETAILS`, `PROCUREMENT_REFERENCE`, or `AI_DOCUMENT_ANALYSIS`. Configuration changes permitted values; a named handler/policy enforces a specialized invariant. For `ADVANCE_SETTLEMENT`, outstanding balance is calculated from the original advance and valid prior settlements in code, not an arbitrary tenant formula. A new screen or document requirement alone is not a new scenario.

The business request is upstream. `PaymentAuthorization` records authority to proceed. An ERP `PaymentRequest`, supplier invoice, or other financial object is downstream and adapter-specific. [Platform rules](12-platform-rules.md), [data/contracts](13-data-contracts.md), and [scenario onboarding](14-scenario-onboarding.md) specify the boundaries.
