# Skills catalog

Setiap skill berada di `skills/{nama}/SKILL.md` dengan frontmatter `name` dan `description`. Skill ini adalah panduan kerja untuk AI coding agent, bukan implementasi fitur aplikasi. Baca hanya skill yang sesuai dengan tugas. Semua skill primary dan supporting merujuk [acuan riset](../docs/00-guide.md) serta [aturan platform](../docs/12-platform-rules.md); contoh dari proyek RFP terdahulu tidak menjadi aturan produk ini. `AGENTS.md` mengarahkan agent di repository ini ke katalog tersebut.

## Primary — khusus rfp-framework

| Skill | Gunakan saat |
| --- | --- |
| [rfp-requirements](rfp-requirements/SKILL.md) | Menambah atau mengubah BRD, PRD, SRS/FSD, dan keterlacakan kebutuhan. |
| [rfp-classification-policy](rfp-classification-policy/SKILL.md) | Mengklasifikasi skenario baru dan membedakan konfigurasi pelanggan dari aturan core. |
| [rfp-workflow-evidence](rfp-workflow-evidence/SKILL.md) | Mendesain status, role, return/resubmit, dan versi dokumen pendukung. |
| [rfp-erp-handoff](rfp-erp-handoff/SKILL.md) | Mendesain handoff, retry, dan rekonsiliasi dengan ERP/SAP. |

## Supporting — dapat dipakai ulang

| Skill | Gunakan saat |
| --- | --- |
| [write-architecture-decision](write-architecture-decision/SKILL.md) | Merekam keputusan arsitektur yang berdampak panjang dalam ADR. |
| [review-threat-model](review-threat-model/SKILL.md) | Memetakan ancaman terhadap desain atau implementasi yang nyata. |
| [review-accessibility](review-accessibility/SKILL.md) | Meninjau hambatan aksesibilitas pada alur, desain, atau halaman. |
| [review-api-contract](review-api-contract/SKILL.md) | Meninjau kontrak API atau event, kompatibilitas, dan perilaku retry. |

Skill supporting ditulis khusus untuk repository ini sebagai panduan orisinal. Referensi yang dipertimbangkan dari skills.sh: [deliver-prd](https://www.skills.sh/product-on-purpose/pm-skills/deliver-prd), [ADR](https://www.skills.sh/arrudadev/skills/adr), [security-threat-model](https://www.skills.sh/openai/skills/security-threat-model), [accessibility](https://www.skills.sh/addyosmani/web-quality-skills/accessibility), dan [api-design-reviewer](https://www.skills.sh/borghei/claude-skills/api-design-reviewer). Tidak ada skill eksternal yang disalin atau diinstal ke repository ini.
