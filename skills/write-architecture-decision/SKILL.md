---
name: write-architecture-decision
description: Record or revise a consequential architecture decision in an ADR when alternatives, trade-offs, and ownership must remain reviewable.
---

# Write an architecture decision

Use for a choice that changes a long-lived boundary, data ownership, integration contract, security guarantee, deployment, or migration strategy. Skip routine implementation details. In this repository, read `docs/adr/README.md`, `docs/11-decision-log.md`, and related requirements before writing to `docs/adr/`.

- Capture the actual context and constraints, the options considered, the proposed or approved choice, consequences, risks, and how it will be verified.
- Distinguish **Proposed** from **Accepted**. Record an accepted decision only when the responsible owner has actually approved it; otherwise state the missing approval.
- Keep one decision per record. Link related requirement and decision IDs, and identify an ADR that it supersedes without deleting historical reasoning.
- Review for contradictions with existing accepted ADRs and update only necessary references.

Return the ADR path, status, affected requirements, and unresolved consequences. Do not treat a conversation suggestion as owner approval.
