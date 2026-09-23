# Glossary — English / Indonesia

Use English identifiers in code and integration contracts. Product labels may be localized. Definitions, not literal translations, control behavior.

| English identifier | Istilah Indonesia | Meaning |
| --- | --- | --- |
| Request for Payment (`RequestForPayment`) | Pengajuan pembayaran | Business case requesting approval to pay. |
| Payment Request (`PaymentRequest`) | Instruksi/permintaan pembayaran di sistem keuangan | Downstream financial object; exact ERP meaning depends on adapter. |
| Requester | Pengaju | Actor who prepares and submits a case. |
| Request Scope | Lingkup pengajuan | Internal or external origin/context of a case. |
| Payment Scenario | Skenario pembayaran | Business reason and lifecycle pattern. |
| Procurement Context | Konteks pengadaan | PO, contract, non-PO, or no procurement relationship. |
| Payee / Beneficiary | Penerima pembayaran | Party whose payment instruction is proposed. |
| One-Time Vendor | Vendor sekali pakai | Vendor classification, not a payment scenario. |
| Transfer List | Daftar transfer | Structured set of beneficiaries/payment lines. |
| Payment Instruction | Instruksi pembayaran | Proposed bank/payment details; not proof of settlement. |
| Supporting Document | Dokumen pendukung | Evidence required by policy. |
| Verification | Verifikasi | Review of completeness and correctness. |
| Approval | Persetujuan | Delegated business decision. |
| Authorization | Otorisasi pembayaran | Permission to initiate downstream handoff. |
| Return for Correction | Pengembalian untuk perbaikan | Requester may correct and resubmit. |
| Rejection | Penolakan | Terminal or policy-defined negative decision. |
| Submission Revision | Revisi pengajuan | Frozen version of submitted facts and evidence. |
| Settlement | Penyelesaian pembayaran | Confirmed downstream outcome, according to evidence contract. |
| Advance | Persekot / uang muka | Payment before final expense accounting. |
| Advance Settlement | Pertanggungjawaban persekot | Adjustment/justification linked to an originating advance. |
| Tenant | Organisasi pelanggan | Isolated customer boundary in SaaS. |
| Business Invariant | Aturan bisnis yang wajib tetap berlaku | Rule that configuration cannot bypass. |
| Platform Guarantee | Jaminan dasar platform | Security, integrity, audit, or reliability property. |
| Policy Configuration | Konfigurasi kebijakan | Versioned customer choices within allowed boundaries. |
| Audit Trail | Jejak audit | Reconstructable record of actions and decisions. |
| Reconciliation | Rekonsiliasi | Match local handoff with ERP/payment outcome. |

**Naming note:** `RFP` is ambiguous internationally because it often means *Request for Proposal*. Prefer `RequestForPayment` in external APIs and new source code.
