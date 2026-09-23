# Acuan dan Batas Blueprint

**Sumber utama:** laporan yang diberikan pemilik produk, *Blueprint Enterprise Request for Payment Platform — Production-Ready, Productizable, dan SaaS-Ready* (diberikan langsung oleh pemilik produk pada 24 September 2026; salinan lengkapnya tidak dipublikasikan di repo). Dokumen repo ini adalah penjabaran operasional dari hasil tersebut. Bila ada perbedaan, catat sebagai keputusan terbuka dan perbaiki dokumen terkait sebelum menjadikannya dasar implementasi.

Blueprint ini dirancang sebagai **produk enterprise/SaaS baru yang tidak mewarisi aturan, tabel, status, atau timing proses dari proyek RFP terdahulu**. Contoh persekot, vendor satu kali, PO/non-PO, dan SAP di dalam laporan hanya menunjukkan cara mengklasifikasi atau membatasi integrasi. Contoh tersebut bukan bukti bahwa setiap pelanggan memakai proses atau mapping yang sama.

Urutan acuan untuk AI coding agent dan tim implementasi:

1. [Aturan platform](12-platform-rules.md) untuk jaminan inti, konfigurasi, versi, dan status.
2. [Model domain](05-domain-model.md) dan [data/kontrak](13-data-contracts.md) untuk istilah dan batas aggregate/API/event.
3. [BRD](01-brd.md), [PRD](02-prd.md), dan [SRS/FSD](03-srs-fsd.md) untuk kebutuhan dan bukti penerimaan.
4. [Arsitektur](06-architecture.md), [keamanan/operasi](07-security-operations.md), dan [onboarding skenario](14-scenario-onboarding.md) untuk desain implementasi.
5. [Decision log](11-decision-log.md) untuk hal yang belum disahkan; nilai tenant, hukum, target operasi, dan kontrak ERP tidak boleh ditebak.

Semua dokumen berstatus **usulan** sampai pemilik keputusan menyetujuinya. Kode, API, schema, dan event memakai istilah Inggris; antarmuka dapat memakai Bahasa Indonesia. Referensi standar dan produk pada laporan adalah rujukan desain, bukan klaim sertifikasi atau kontrak integrasi yang sudah diverifikasi untuk pelanggan tertentu.
