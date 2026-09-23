# Security, Audit, and Operations

**Status:** proposal. This is an engineering baseline, not a certification claim.

## Security guarantees

| ID | Guarantee | Verification |
| --- | --- | --- |
| SEC-01 | Tenant isolation for records, files, jobs, events, search, cache, and exports. | Cross-tenant negative tests and access review. |
| SEC-02 | Authentication plus server-side authorization for every read, command, file, and transition. | Role/attribute matrix tests. |
| SEC-03 | Segregation of duties and delegated authority on decisions. | Self-approval and conflicting-role tests. |
| SEC-04 | Encrypted transport and protected secrets/keys. | Deployment checks and key rotation exercise. |
| SEC-05 | Document scanning, type/size limits, safe downloads, and version provenance. | Malicious/invalid file tests. |
| SEC-06 | Append-only logical audit trail with monitored integrity and controlled retention. | Audit event reconciliation and tamper alert test. |
| SEC-07 | Least-privilege ERP credentials and replay-resistant integrations. | Integration access review and duplicate delivery test. |

Privacy and retention rules must be set per jurisdiction and tenant contract. Sensitive account, tax, and identity data should be minimized, masked in routine views, and excluded from logs. AI extraction requires an approved data-processing boundary and human review; it must not approve or authorize payments.

## Operations

Define service-level objectives, alert thresholds, backup frequency, RPO/RTO, retention, incident response, disaster recovery, and support ownership before production (`DEC-06`, `DEC-07`). Monitor: failed transitions, document scan failures, outbox age, ERP retries, reconciliation mismatches, queue depth, tenant isolation alarms, and audit pipeline lag. Exercise restore and replay with representative data, including an unresolved ERP outcome.

## Reference frameworks

Use ISO/IEC/IEEE 29148 for requirements structure, ISO/IEC/IEEE 42010 for architecture description, OWASP ASVS for application security checks, and WCAG 2.2 for accessibility targets as applicable. Mentioning these references does not assert compliance or certification.

## Detailed production baseline

Resolve tenant context from authenticated identity and authorized relationships, never solely from a caller-supplied header. Deny by default. A business action needs both resource permission and eligibility in the current workflow step. Keep bank and identity snapshots under restricted field access; store ERP credentials as secret references. Uploads use extension/type/signature/size checks, quarantine, malware scanning, generated object keys, private storage, and authorized download.

P0 operational guarantees include atomic financial transitions, optimistic concurrency, durable outbox/queue, idempotent ERP operations, immutable document versions, tenant isolation, audit, backups, health monitoring, secure secrets, and controlled retries. Availability, latency, RPO/RTO, retention, and residency numbers remain open deployment contracts.

Carry trace and correlation IDs through API, workflow, queue, AI, and ERP; log tenant and aggregate identifiers only where authorized. Never log full bank account, tax number, document body, access token, password, or ERP credential. Monitor business health: stuck requests, return reasons, unresolved corrections, low-confidence AI extractions, outbox age, ERP failures, and unreconciled submissions.

Minimum verification adds negative authorization and cross-tenant tests, every legal/illegal transition, concurrent approvals, document return/reupload, API/event schema compatibility, outbox crash recovery, duplicate delivery, ERP uncertain timeout, file abuse, resilience, and restore exercises. AI upgrades require an annotated golden dataset and measured extraction errors. See [platform rules](12-platform-rules.md).
