# Domain Model and Classification

**Status:** proposal. `RequestForPayment` is the business aggregate, not an ERP payment object.

## Bounded contexts

Request Management; Classification; Payee; Procurement Context; Payment Instruction; Documents; Workflow and Approval; Business Rules; Return and Correction; Accounting Context; ERP Integration; Audit and Compliance; Tenant Configuration. Context boundaries describe ownership and contracts, not mandatory microservices.

## Aggregate and relationships

```text
RequestForPayment
├── identity, tenant, requester, purpose, amount/currency
├── classification and scenario-specific data
├── payees and proposed payment instructions
├── references (e.g. advance → settlement)
├── submission revisions and workflow decisions
├── supporting document references and versions
└── integration references and reconciliation events
```

The aggregate controls allowed state changes and consistency of its own revision. Documents may be stored separately but must be bound to a request revision and protected by the same tenant and authorization policies.

## Independent classification dimensions

| Dimension | Example values | Meaning |
| --- | --- | --- |
| `requestScope` | `INTERNAL`, `EXTERNAL` | Who initiates the business request. |
| `paymentScenario` | `VENDOR_INVOICE`, `EMPLOYEE_PAYMENT`, `ADVANCE`, `ADVANCE_SETTLEMENT`, `UTILITY_PAYMENT`, `OTHER_PAYMENT` | Business reason and lifecycle rules. |
| `procurementContext` | `PO_BASED`, `CONTRACT_BASED`, `NON_PO`, `NO_PROCUREMENT` | Source of procurement commitment/evidence. |
| `payeeType` | `VENDOR`, `EMPLOYEE`, `INDIVIDUAL`, `GOVERNMENT`, `OTHER` | Party receiving payment. |
| `vendorClassification` | `REGISTERED_VENDOR`, `ONE_TIME_VENDOR` | Vendor master relationship; applicable only to vendor payees. |
| `paymentStructure` | `SINGLE_PAYEE`, `MULTI_PAYEE` | Number of beneficiaries/instructions. |

`ONE_TIME_VENDOR` is **not** a payment scenario. A transfer list is a payment structure/data capability, not a reason for payment. “Other payment” needs controlled free-form description, risk review, and eventual reclassification criteria.

## New scenario intake contract

Before adding a scenario, define: identity and purpose; permitted scopes; requester and payee; data and references; required documents; validations; workflow; authorization; ERP mapping; and completion evidence. Prefer a new configuration profile when the difference is an allowed policy variation. Add core behavior only when the domain invariant or a general product capability truly changes.

## Core vs configuration examples

| Core code | Versioned tenant configuration |
| --- | --- |
| Tenant isolation, authorization, state transitions, audit integrity, document provenance, idempotency, amount/currency consistency | Required document matrix, allowed scenarios, field visibility, approval thresholds, routing rules, labels, ERP code mapping |

A configuration engine may select among permitted transitions; it cannot create an unaudited transition or bypass segregation of duties. Validate configuration against a schema and simulate it before publication.
