# UI/UX and User Flows

**Status:** proposal. Validate with requesters, verifiers, approvers, finance, and accessibility reviewers.

## Navigation model

Use task-based navigation: **My drafts**, **My submitted requests**, **Assigned to me**, **Returned for correction**, **History**, and (for authorized operations) **Integration exceptions**. Show the request identity, current step, action owner, and next expected action consistently.

## Core flow

```text
Choose scenario → Enter business context → Add payee/payment details
→ Add required evidence → Review validation → Submit
→ Verify → Approve/return → Authorize → ERP handoff → Reconcile
```

| Step | Screen behavior | Error/empty behavior |
| --- | --- | --- |
| Classification | Ask separate questions for scope, scenario, procurement context, payee type, and payment structure. | Explain unsupported combinations and who can request a new scenario. |
| Draft | Save partial progress; display effective policy and required fields. | Keep entered values after validation errors. |
| Documents | Show required, optional, uploaded, and rejected items; version and scan status. | Block unsafe or invalid files and show a clear reason. |
| Review/submit | Present totals, beneficiaries, evidence, and policy summary. | Focus the first error and link to all errors. |
| Assigned work | Show case snapshot, decision history, conflicts, and policy version. | Explain why an action is unavailable. |
| Return/correction | Show reason per field/document and what changed between revisions. | Preserve old submissions and avoid losing uploads. |
| Integration | Show business authorization separately from ERP and settlement status. | Provide retry/exception visibility to authorized staff. |

## Interaction rules

- Server rules decide eligibility; the UI only presents them.
- Never silently replace a submitted document. Reupload creates a new version.
- Distinguish **Save draft**, **Submit**, **Return**, **Reject**, and **Authorize** with confirmation and plain-language effects.
- Include accessible labels, keyboard operation, error summaries, and clear focus changes. Test against the agreed accessibility target (`DEC-07`).
- Show tenant-localized labels while retaining stable English identifiers in APIs and code.

## Example: returned case

Requester opens **Returned for correction**, reads the verifier's reason, edits only allowed fields, replaces an invalid receipt, reviews the diff and revised total, then resubmits. The next reviewer sees both revisions and the reason for return.
