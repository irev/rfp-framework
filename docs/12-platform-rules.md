# Platform Rules and Configuration Boundary

**Status:** proposed reference architecture. This document distills the owner-provided deep research report. It defines product-wide design constraints, independent of any earlier RFP implementation. Values, deployment topology, and customer policies still require explicit decisions.

## Decision rule for new behavior

Ask what changed before adding a form, enum, handler, or service.

| Change | Put it in | Example |
| --- | --- | --- |
| Allowed value, threshold, document list, actor mapping, or route | Validated, versioned configuration | Approval threshold by legal entity |
| Reusable behavior across scenarios | Product capability | `MULTI_PAYEE`, `REFERENCE_REQUEST` |
| Unique business invariant within an existing purpose | Named policy or handler in code | Outstanding advance calculation |
| Fundamentally different business purpose, lifecycle, or accounting meaning | New `PaymentScenario` | `ADVANCE_SETTLEMENT` vs `ADVANCE` |

A different screen, PO/non-PO choice, one-time vendor, or transfer list alone does not justify a new `PaymentScenario`. A scenario answers **why the organization is paying**. Procurement, payee, scope, and payment structure answer different questions.

## P0 platform guarantees

These controls live in core code and cannot be disabled by tenant configuration:

1. Verified tenant context and isolation across records, files, caches, jobs, search, events, logs, and exports.
2. Authentication, deny-by-default authorization, resource relationship checks, and valid workflow transitions on every action.
3. Atomic business transitions and outbox write; optimistic concurrency for request and workflow state.
4. Immutable published definitions and historical version/snapshot integrity.
5. Immutable document versions, secure upload, access control, and provenance.
6. Append-only logical audit history with actor, time, version, and correlation evidence.
7. Decimal or fixed-point monetary calculations and reconciliation of amounts and currencies.
8. Idempotent financial handoff, controlled retries, and reconciliation of uncertain ERP outcomes.

P1 disciplines include compatible API/event schemas, structured errors, trace propagation, configuration validation before publication, AI result provenance, and sensitive-data redaction. Extension hooks and SaaS entitlements may follow as P2, but cannot weaken P0.

## Published definition lifecycle

`DRAFT → validate → simulate → review → publish ACTIVE → RETIRED` is a definition lifecycle, not a request lifecycle. Publishing creates an immutable version and a content hash. To change an active definition, create a new draft version. A rollback selects or publishes another version; it never edits history.

Pin `PaymentScenarioDefinition` when a draft request is created. Offer an **explicit** rebase before first submission if policy permits it. At first submission, bind the request to the effective workflow, document, accounting, and integration profile versions, and snapshot the facts needed to reconstruct decisions. A running case never silently adopts a new version. Any migration requires an authorized, audited procedure.

Configuration inheritance may resolve from platform default through tenant, legal entity, and business unit, if those layers are adopted. The resolver returns **value, source scope, revision, and effective time**. Only approved policy keys may inherit or override. No layer may set `tenantIsolation = false`, bypass authorization, disable audit/versioning, or weaken idempotency.

## Runtime boundaries

Use separate state models for the business request and ERP submission. A proposed business lifecycle is `DRAFT → SUBMITTED → IN_REVIEW → APPROVED → COMPLETED`, with controlled `RETURNED`, `REJECTED`, and `CANCELLED` paths. A proposed integration lifecycle is `PENDING → READY → QUEUED → SENT → ACCEPTED → RECONCILED`, with `FAILED` and `RETRYING` paths. `APPROVED` authorizes downstream work; it does not prove ERP acceptance or payment settlement. Final status names and completion evidence require product and finance decisions.

An action is allowed only when tenant access, authorization policy, resource relationship, current workflow eligibility, business rules, and concurrency checks all pass. A role or permission alone does not make an actor eligible for the current workflow step. State changes use explicit commands, never a client patch to a status field.

## Extension and AI boundaries

The application core depends on ports such as `DocumentStorage`, `DocumentAnalyzer`, `ErpGateway`, `IdentityProvider`, and `NotificationGateway`. ERP, storage, AI, and framework DTOs stay in adapters. One customer receives configuration or a controlled capability/handler/adapter extension, not a fork of the shared core.

Document AI runs asynchronously against an immutable `DocumentVersion`. Store provider, model, analysis profile and schema versions, confidence, field evidence, and review corrections. AI extracts or flags; deterministic rules validate; accountable humans verify and approve. AI output cannot authorize a payment.

## Proof before production

Every candidate scenario definition must pass schema, capability, handler, document policy, workflow graph and actor resolution, accounting/integration reference, return/resubmit, hash, and unknown-key validation. The platform needs domain, invalid-transition, authorization, cross-tenant, upload/version, race, API/event compatibility, duplicate delivery, outbox crash, ERP timeout, resilience, and security tests. AI changes additionally need a fixed annotated document dataset and error measurements.

See [data and contracts](13-data-contracts.md), [scenario onboarding](14-scenario-onboarding.md), [SRS/FSD](03-srs-fsd.md), and the [decision log](11-decision-log.md).
