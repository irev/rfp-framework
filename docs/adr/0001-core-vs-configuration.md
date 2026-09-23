# ADR-0001: Core rules and tenant configuration boundary

Status: **Proposed**
Date: 2026-09-24
Owners: to be assigned
Related requirements: BR-06, PR-06, FR-09, NFR-01 through NFR-04

## Context

A marketable RFP product must support customer policy differences without weakening guarantees or multiplying customer-specific forks. Changes to required documents, routing, and labels are common; changes to authorization, audit, tenant isolation, and financial consistency carry platform-wide risk.

## Decision

Expose only bounded, schema-validated, versioned configuration for allowed choices. Keep tenant isolation, authorization, transition integrity, audit provenance, idempotency, and consistency in core code. Bind each submitted case to a published policy version. Review and simulate configuration before it becomes effective.

## Consequences

The platform needs a policy schema, review workflow, effective-date handling, and scenario tests. A new behavior that cannot be expressed safely as configuration requires a product change and explicit ADR. Customer-specific configuration cannot bypass core guarantees.

## Alternatives considered

Customer forks increase drift and upgrade cost. Unrestricted scripting makes authority, security, and audit behavior difficult to reason about. Both are rejected for the initial architecture.
