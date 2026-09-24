# Glossary — English / Indonesia

Use English identifiers in code and integration contracts. Product labels may be localized. Definitions, not literal translations, control behavior.

| English identifier | Istilah Indonesia | Meaning |
| --- | --- | --- |
| Request for Payment (`RequestForPayment`) | Pengajuan pembayaran | Business case requesting approval to pay. |
| Payment Request (`PaymentRequest`) | Instruksi/permintaan pembayaran di sistem keuangan | Downstream financial object; exact ERP meaning depends on adapter. |
| Requester | Pengaju | Actor who prepares and submits a case. |
| Request Scope | Lingkup pengajuan | Internal or external origin/context of a case. |
| Payment Scenario | Skenario pembayaran | Tujuan/alasan bisnis pembayaran; bukan kategori PO, vendor, atau jumlah penerima. |
| Procurement Context | Konteks pengadaan | PO, contract, non-PO, or no procurement relationship. |
| Payee / Beneficiary | Penerima pembayaran | Party whose payment instruction is proposed. |
| Payment To (UI label) | Dibayarkan kepada | Legacy/display label for selecting a `Payee`, not an independent domain entity. |
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

## Additional domain and contract terms

| English identifier | Istilah Indonesia | Meaning |
| --- | --- | --- |
| `PaymentScenarioDefinition` | Definisi skenario pembayaran | Versi immutable dari scenario, capabilities, dan referensi kebijakan. |
| `ScenarioVariant` | Varian skenario | Subkategori bila diperlukan tanpa mengubah tujuan bisnis. |
| `Capability` | Kapabilitas | Perilaku produk yang dapat dipakai ulang di beberapa scenario. |
| `BusinessReference` | Referensi bisnis | Relasi ke pengajuan/objek lain, misalnya `SETTLEMENT_OF`. |
| `DocumentRequirement` | Persyaratan dokumen | Bukti wajib/opsional yang dibekukan untuk sebuah pengajuan. |
| `DocumentVersion` | Versi dokumen | Binary dan metadata immutable untuk satu unggahan. |
| `DocumentAnalysis` | Analisis dokumen | Hasil ekstraksi AI terikat versi dokumen, model, schema, dan review. |
| `WorkflowDefinition` | Definisi alur kerja | Versi langkah, transisi, dan aturan aktor yang dipublikasikan. |
| `WorkflowInstance` | Instans alur kerja | Proses aktif sebuah pengajuan dengan langkah dan versi runtime. |
| `ReturnCase` / `ReturnItem` | Kasus / butir pengembalian | Alasan koreksi dan target spesifik beserta baseline. |
| `AccountingProfile` | Profil akuntansi | Kebijakan/mapping accounting yang diberi versi. |
| `IntegrationProfile` | Profil integrasi | Versi route/mapper ERP; menyimpan referensi secret, bukan nilainya. |
| `IntegrationSubmission` | Pengiriman integrasi | Satu operasi ERP logis dengan upaya, hasil, dan rekonsiliasi. |
| `PaymentAuthorization` | Otorisasi pembayaran | Wewenang bisnis untuk meneruskan ke sistem hilir; belum berarti dibayar. |
| `Canonical ERP Command` | Perintah ERP kanonis | Perintah dalam bahasa domain platform sebelum mapping ke ERP. |
| `Transactional Outbox` | Kotak keluar transaksional | Event yang ditulis bersama perubahan status bisnis dalam satu transaksi. |
| `Idempotency Key` | Kunci idempotensi | Identitas operasi logis agar retry tidak menggandakan efek finansial. |
| `Configuration Provenance` | Asal konfigurasi | Scope, revisi, dan waktu efektif dari nilai kebijakan yang dipakai. |
