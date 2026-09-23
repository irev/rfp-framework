---
name: review-accessibility
description: Review a user flow, design, or rendered page for accessibility barriers and propose evidence-backed fixes using the agreed WCAG target.
---

# Review accessibility

Use for UI/UX plans, forms, document upload, returned-case correction, work queues, and documentation pages. Confirm the agreed accessibility target; in this repository `docs/07-security-operations.md` references WCAG 2.2 as a planning baseline, not certified conformance.

- Inspect the actual artifact. For a rendered UI, exercise keyboard order, focus visibility and return, labels, errors, status announcements, zoom/reflow, and contrast. Use automated checks as supporting evidence, not proof of full conformance.
- For a design without a live UI, identify missing interaction specifications and mark them as design risks, not observed defects.
- Tie each finding to a specific screen, element, interaction, user impact, and relevant criterion when known. Distinguish verified barriers from items needing assistive-technology or user validation.
- Recommend the smallest usable change and a way to verify it. Check that correction, upload, and approval actions remain understandable without color or pointer-only cues.

Do not report a WCAG pass based solely on static markup or an automated score.

Read `docs/00-guide.md` and `docs/12-platform-rules.md` first. This is a new enterprise product baseline; do not infer rules, status meanings, or posting timing from an earlier RFP project.
