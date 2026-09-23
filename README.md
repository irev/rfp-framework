# rfp-framework

**Request for Payment Platform — enterprise blueprint (proposal).**

This repository is a technology-agnostic reference for designing a multi-tenant Request for Payment (RFP) product. It is a planning baseline, not an implemented payment system or an approved business policy. All examples and defaults require validation with product, finance, legal, security, and operations owners before production use.

**Terminology:** `RequestForPayment` is the business request and approval case. A downstream ERP `PaymentRequest` or payment instruction is a separate integration concept. `RFP` can mean *Request for Proposal* elsewhere; use the full name in code, APIs, and external contracts.

## Start here

| Need | Document |
| --- | --- |
| Business outcomes and scope | [BRD](docs/01-brd.md) |
| Product goals and releases | [PRD](docs/02-prd.md) |
| Testable behavior | [SRS/FSD](docs/03-srs-fsd.md) |
| Screens and task paths | [UI/UX and user flows](docs/04-ui-ux-user-flows.md) |
| Domain and classification | [Domain model](docs/05-domain-model.md) |
| Architecture and integrations | [Architecture](docs/06-architecture.md) |
| Security, tenant isolation, audit | [Security and operations](docs/07-security-operations.md) |
| Requirement mapping | [Traceability](docs/08-traceability.md) |
| English ↔ Indonesian terms | [Glossary](docs/09-glossary-en-id.md) |
| Delivery order | [Roadmap](docs/10-roadmap.md) |
| Open choices | [Decision log](docs/11-decision-log.md) |
| Design decision records | [ADR index](docs/adr/README.md) |

The public [documentation site](https://irev.github.io/rfp-framework/) renders `docs/` as searchable pages. Its Skills section is generated from the source files in [skills/](skills/README.md), so readers can navigate the guidance without opening GitHub's code view.

## Documentation development

Use Node.js 22 or newer. Run `npm ci`, then `npm run docs:dev` for a local preview or `npm run docs:build` to check the production output. The build generates pages for the skill files and publishes through `.github/workflows/docs.yml` on pushes to `main`.

## Non-negotiable design rule

Customer-specific behavior belongs in **versioned, validated configuration** only when it changes an allowed policy, field, document requirement, routing rule, or integration mapping. **Business invariants and platform guarantees remain in core code**: authorization, tenant isolation, state transition integrity, evidence preservation, audit, idempotency, and financial consistency. A configuration must never bypass them.

## Repository use

1. Review the [decision log](docs/11-decision-log.md); resolve decisions that affect your deployment.
2. Select a scenario and record its classification dimensions in the [domain model](docs/05-domain-model.md).
3. Turn [SRS/FSD](docs/03-srs-fsd.md) IDs into executable acceptance tests and link them through [traceability](docs/08-traceability.md).
4. Record architecture trade-offs as ADRs before implementing a customer-specific exception.

There is no license grant yet. Do not assume the repository contents may be redistributed or sold until the owner chooses a license.
