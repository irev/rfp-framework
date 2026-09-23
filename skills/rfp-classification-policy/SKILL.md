---
name: rfp-classification-policy
description: Classify a new RFP business scenario and decide whether its variability belongs in versioned tenant policy or shared core behavior.
---

# RFP classification and policy

Use this skill when a customer requests a new transaction type, transfer list, payee variation, procurement case, or approval condition. Read `docs/05-domain-model.md`, `docs/06-architecture.md`, `docs/11-decision-log.md`, and `docs/adr/0001-core-vs-configuration.md`.

1. Describe the business purpose and independently classify `requestScope`, `paymentScenario`, `procurementContext`, `payeeType`, `vendorClassification` when applicable, and `paymentStructure`. Do not combine these into a single transaction enum.
2. Capture requester, beneficiary, required data, references, documents, validation, workflow, authorization, ERP mapping, and completion evidence. A transfer list is a payment structure capability; `ONE_TIME_VENDOR` is a vendor classification, not a scenario.
3. Place permitted field, document, routing, threshold, label, and mapping variation in schema-validated, versioned tenant policy. Keep tenant isolation, authorization, transition integrity, audit, provenance, idempotency, and financial consistency in core code.
4. For a genuinely new shared business invariant or product capability, propose a core change and an ADR. For a customer exception that would bypass a guarantee, explain the conflict rather than encoding it.
5. Describe policy publication, effective date, existing-case behavior, and representative valid/invalid examples. Update requirements and traceability if the scenario is accepted.

Treat `OTHER_PAYMENT` as a controlled scenario requiring a concrete purpose and review, not a permanent bucket for undefined behavior.
