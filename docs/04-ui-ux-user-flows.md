# UI/UX and User Flows

**Status:** proposal. Validate with requesters, verifiers, approvers, finance, and accessibility reviewers.

## Navigation model

Use task-based navigation: **My drafts**, **My submitted requests**, **Assigned to me**, **Returned for correction**, **History**, and (for authorized operations) **Integration exceptions**. These are authorized query projections over `RequestForPayment`, workflow, and integration records, not separate RFP entities. Show the request identity, current step, action owner, and next expected action consistently.

## Core flow

```text
Choose scenario → Enter business context → Add payee/payment details
→ Add required evidence → Review validation → Submit
→ Verify → Approve/return → Business authorization → ERP handoff → Reconcile external outcome
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

When the configured target is the requester, the requester opens **Returned for correction**, reads the verifier's reason, edits only allowed fields, replaces an invalid receipt, reviews the diff and revised total, then resubmits. If the target is a prior review step, its eligible actor receives the case and follows that step's permitted correction or routing actions. The next reviewer sees both revisions and the reason for return.

## Research-derived interaction details

Show the scenario definition and document/workflow policy version that governs the case. A draft may offer **explicit rebase** to a newer definition; show what changes and require a deliberate action. In reviewer views, show eligibility and authority separately: a generic permission does not make someone the actor for the current step.

The return screen groups `ReturnItems` by document, field, payment item, payee, or reference, with the baseline version and correction status. A new upload visibly creates a new immutable `DocumentVersion`. The case timeline distinguishes business state, ERP submission state, and external completion evidence. Optional AI analysis shows extraction source/confidence and human correction; it never presents AI as an approver.
