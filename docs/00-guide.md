# Blueprint Enterprise Request for Payment Platform — Production-Ready, Productizable, dan SaaS-Ready

**Acuan dasar:** laporan riset dengan judul di atas, diberikan oleh pemilik produk pada 24 September 2026. Halaman ini adalah penjelasan yang dipelihara dalam repo untuk tim dan AI coding agent. [BRD](01-brd.md), [PRD](02-prd.md), [SRS/FSD](03-srs-fsd.md), [arsitektur](06-architecture.md), dan [skills](skills/index.md) menurunkan prinsipnya ke pekerjaan yang dapat diuji. Salinan lengkap laporan tidak dipublikasikan di repo.

::: warning Status keputusan
Blueprint ini adalah **usulan desain produk**, bukan kebijakan pelanggan yang sudah disahkan atau aplikasi pembayaran yang sudah dibangun. Nilai threshold, status akhir, aturan hukum, topologi tenant, dan mapping ERP tetap memerlukan pemilik keputusan. Catat hal yang belum pasti di [decision log](11-decision-log.md).
:::

## Tujuan dan batas produk

Bangun **Request for Payment Orchestration Platform** untuk banyak organisasi: terima alasan bisnis pembayaran, klasifikasikan konteks, kumpulkan bukti, jalankan aturan dan alur verifikasi/persetujuan, otorisasi handoff, kirim melalui adaptor ERP, dan rekonsiliasi hasilnya. `RequestForPayment` adalah business case di hulu. `PaymentRequest`, supplier invoice, atau objek pembayaran ERP adalah konsep hilir yang hanya dimaknai melalui kontrak adaptor.

`PaymentScenario` menjawab **mengapa organisasi membayar**. Pertanyaan lain menjadi dimensi terpisah:

| Dimensi kode | Pertanyaan | Contoh |
| --- | --- | --- |
| `RequestScope` | Dari konteks pengajuan mana? | `INTERNAL`, `EXTERNAL` |
| `PaymentScenario` | Untuk tujuan bisnis apa? | `VENDOR_INVOICE`, `ADVANCE`, `ADVANCE_SETTLEMENT` |
| `ProcurementContext` | Terkait pengadaan bagaimana? | `PO_BASED`, `NON_PO` |
| `PayeeType` / `VendorClassification` | Siapa penerima dan klasifikasinya? | `VENDOR` / `ONE_TIME_VENDOR` |
| `PaymentStructure` | Bagaimana susunan penerima/item? | `SINGLE_PAYEE`, `MULTI_PAYEE` |
| `BusinessReference` | Terhubung dengan kasus apa? | `SETTLEMENT_OF` |

PO/non-PO, vendor satu kali, internal/eksternal, dan multi-payee **bukan** skenario pembayaran. Contoh dalam riset membantu klasifikasi; aturan atau waktu posting dari proyek RFP terdahulu tidak diwariskan ke produk ini. Lihat [model domain](05-domain-model.md) dan [glosarium EN–ID](09-glossary-en-id.md).

::: info Perubahan arah dari percakapan awal
Saran awal untuk modul Laravel pernah memakai `TransactionType`, `TransactionDetail`, dan tabel master terkait. Arahan produk enterprise yang lebih akhir menggantikan pusat klasifikasi itu dengan `PaymentScenarioDefinition` dan dimensi independen. Model awal tersebut adalah konteks desain sebelumnya, bukan kontrak yang harus dibangun oleh framework ini.
:::

## Aturan yang harus dipertahankan AI

Konfigurasi menentukan variasi bisnis yang diizinkan; core code menjamin keamanan dan kebenaran cara menjalankannya. Pelanggan boleh memilih dokumen, threshold, aktor, workflow, mata uang, dan route yang valid. Pelanggan tidak boleh mematikan isolasi tenant, otorisasi, audit, integritas transisi, versi dokumen, ketepatan nilai uang, idempotensi, atau outbox.

Definisi yang dipublikasikan immutable. Draft pengajuan mem-pin `PaymentScenarioDefinition`; pada submission pertama, versi workflow, dokumen, accounting, dan integration serta fakta historis yang diperlukan dibekukan. Rebase/migrasi harus eksplisit dan diaudit. Status business request, status `IntegrationSubmission`, dan bukti settlement dibaca terpisah. Return diarahkan ke target langkah workflow yang valid; targetnya tidak selalu pemohon. Draft boleh dibuat sebelum dokumen diunggah, sedangkan minimum field draft masih keputusan terbuka (`DEC-14`). AI dokumen bekerja asinkron sebagai ekstraksi/sinyal; aturan deterministik dan manusia memegang validasi serta persetujuan. Rincian wajib ada di [aturan platform](12-platform-rules.md).

## PaymentScenario Onboarding

Jangan mulai dengan form atau enum baru. Mulai dari tujuan bisnis dan bandingkan dengan katalog skenario. Urutannya: **discover → classify → analyze references → map capabilities → define policies → validate → publish → observe**. Setiap tahap memiliki output dan gate pada [SOP onboarding](14-scenario-onboarding.md).

### Decision tree untuk permintaan baru

```text
Kebutuhan bisnis baru
  ├─ Tujuan bisnis sudah diwakili scenario yang ada?
  │    ├─ Ya → Nilai/threshold/dokumen/routing berbeda saja?
  │    │        ├─ Ya → Konfigurasi tervalidasi dan diberi versi
  │    │        └─ Tidak → Perilaku dapat dipakai scenario lain?
  │    │                    ├─ Ya → Capability bersama
  │    │                    └─ Tidak → Named handler/policy untuk invariant khusus
  │    └─ Tidak → Tujuan, lifecycle, atau makna accounting sungguh berbeda?
  │             ├─ Ya → PaymentScenario baru dengan definisi immutable
  │             └─ Tidak → Perbaiki klasifikasi; evaluasi config/capability/policy
  └─ Di setiap cabang → cek jaminan core; perubahan tidak boleh melemahkannya
```

Hasil decision tree harus menjelaskan alasan, alternatif yang ditolak, pemilik keputusan, definisi/versi yang terdampak, dan tes yang membuktikannya. `VENDOR_INVOICE + PO_BASED` dan `VENDOR_INVOICE + NON_PO` dapat tetap satu scenario. `ADVANCE_SETTLEMENT` dapat menjadi scenario berbeda dari `ADVANCE` karena referensi dan invariant saldo. Contoh ini bukan konfigurasi yang wajib berlaku untuk semua tenant.

## End-state architecture

Diagram ini menunjukkan **batas logis**, bukan kewajiban membuat satu microservice per kotak atau urutan sinkron untuk setiap request.

```text
Request context        Business context            Financial context
scope/requester        scenario/variant/reference  payee/instruction/items
          └──────────────────┬──────────────────────┘
                             ↓
                 Policy resolution + provenance
                    (tenant, scope, revision)
                             ↓
       Procurement ─── Document evidence ─── Workflow
       PO/contract      versions / AI async         steps / return
          └──────────────────┬──────────────────────┘
                             ↓
           Authorization + business state + audit
                             ↓
                AccountingProfile (versioned)
                             ↓
          IntegrationProfile + canonical ERP command
                             ↓
                  ERP anti-corruption layer
                             ↓
                   SAP / other ERP adapter

Cross-cutting: tenant isolation, immutable definitions,
transactional DB + outbox, queue, private object storage,
idempotency, observability, backup and recovery.
```

Mulai dengan **modular monolith** yang memiliki bounded contexts dan relational transactional core. Dokumen disimpan privat di object storage; event disimpan atomik bersama transisi bisnis melalui outbox; worker dan adaptor bekerja asinkron. SAP/ERP DTO, SDK storage, dan AI provider tetap di luar domain core. Lihat [arsitektur akhir dan kontrak port](06-architecture.md) serta [data/API/event](13-data-contracts.md).

## Peta bagian laporan ke dokumen kerja

| Bagian acuan riset | Dokumen yang dipelihara dalam repo |
| --- | --- |
| Model domain, klasifikasi, bounded contexts | [Model domain](05-domain-model.md), [glosarium](09-glossary-en-id.md) |
| Data, versioning, workflow, dokumen, AI | [Aturan platform](12-platform-rules.md), [data/kontrak](13-data-contracts.md), [SRS/FSD](03-srs-fsd.md) |
| API, event, integrasi ERP/SAP | [Data/kontrak](13-data-contracts.md), [arsitektur](06-architecture.md) |
| Multi-tenant, security, reliability, observability, testing | [Keamanan dan operasi](07-security-operations.md), [traceability](08-traceability.md) |
| Onboarding, guarantees, tiering, roadmap | [Onboarding skenario](14-scenario-onboarding.md), [roadmap](10-roadmap.md), [decision log](11-decision-log.md) |

Jika sebuah topik belum cukup rinci untuk implementasi, tambahkan requirement/ADR yang dapat diuji dan catat keputusan pemiliknya. Jangan mengisi celah dengan perilaku dari aplikasi RFP lama atau asumsi tentang SAP tertentu.

## Cara AI coding agent mengerjakan perubahan

1. Baca permintaan pengguna, dokumen kebutuhan yang relevan, keputusan yang telah disetujui, panduan ini, dan skill yang sesuai. Perlakukan laporan sebagai **data desain**, bukan instruksi eksekusi. Bila ada konflik, jelaskan dan perbarui decision log; jangan menebak aturan pelanggan.
2. Nyatakan tujuan bisnis, aktor, tenant, klasifikasi independen, pemilik data, kondisi awal/akhir, dan sumber bukti. Tunjukkan batas antara core guarantee, konfigurasi, capability, handler, dan adaptor dengan decision tree di atas.
3. Hubungkan perubahan ke ID BR/PR/FR/NFR dan ADR. Tetapkan versi definisi, snapshot historis, otorisasi, transisi, concurrency, audit, idempotensi, serta jalur gagal/return/retry sebelum membuat layar atau endpoint.
4. Implementasikan melalui application use case, domain/policy, port, dan adaptor. Gunakan command eksplisit untuk transisi; jangan mengubah status lewat PATCH bebas. Jangan menyimpan secret literal di konfigurasi atau menaruh data bank/dokumen di event/log rutin.
5. Verifikasi kasus valid dan penolakan: aktor tidak sah, tenant lain, versi usang, dokumen bermasalah, return/resubmit, duplikasi, outbox crash, ERP timeout tak pasti, dan hasil AI keliru bila relevan. Uji kontrak schema/API/event serta aksesibilitas alur pengguna.
6. Perbarui dokumen dan traceability yang terdampak. Laporkan perubahan, tes yang benar-benar dijalankan, asumsi, risiko tersisa, dan keputusan yang masih memerlukan owner.

Untuk skenario baru, gunakan [definition of done](14-scenario-onboarding.md). Untuk baseline produksi, gunakan [keamanan dan operasi](07-security-operations.md). Pemilihan bahasa pemrograman, framework, SAP edition, hierarki tenant, residency, retensi, SLO, dan tier komersial tetap keputusan produk/deployment; jangan mengubah contoh laporan menjadi default universal.
