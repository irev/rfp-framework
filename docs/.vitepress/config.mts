import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'id-ID',
  title: 'RFP Framework',
  description: 'Dokumentasi blueprint Request for Payment Platform untuk skala enterprise.',
  base: '/rfp-framework/',
  head: [
    ['meta', { name: 'theme-color', content: '#15343d' }],
  ],
  themeConfig: {
    siteTitle: 'RFP Framework',
    nav: [
      { text: 'Ikhtisar', link: '/' },
      { text: 'Panduan', link: '/00-guide' },
      { text: 'Kebutuhan', link: '/01-brd' },
      { text: 'Domain & arsitektur', link: '/05-domain-model' },
      { text: 'Skills', link: '/skills/' },
    ],
    sidebar: [
      {
        text: 'Mulai di sini',
        items: [
          { text: 'Ikhtisar', link: '/' },
          { text: 'Acuan & batas', link: '/00-guide' },
          { text: 'Aturan platform', link: '/12-platform-rules' },
          { text: 'Glosarium EN–ID', link: '/09-glossary-en-id' },
        ],
      },
      {
        text: 'Kebutuhan & pengalaman',
        items: [
          { text: 'BRD · kebutuhan bisnis', link: '/01-brd' },
          { text: 'PRD · kebutuhan produk', link: '/02-prd' },
          { text: 'SRS/FSD · spesifikasi', link: '/03-srs-fsd' },
          { text: 'UI/UX & user flow', link: '/04-ui-ux-user-flows' },
          { text: 'Traceability', link: '/08-traceability' },
        ],
      },
      {
        text: 'Desain platform',
        items: [
          { text: 'Model domain', link: '/05-domain-model' },
          { text: 'Arsitektur teknis', link: '/06-architecture' },
          { text: 'Data, API & event', link: '/13-data-contracts' },
          { text: 'Onboarding skenario', link: '/14-scenario-onboarding' },
          { text: 'Keamanan & operasi', link: '/07-security-operations' },
        ],
      },
      {
        text: 'Pengelolaan keputusan',
        items: [
          { text: 'Roadmap', link: '/10-roadmap' },
          { text: 'Decision log', link: '/11-decision-log' },
          { text: 'Panduan ADR', link: '/adr/README' },
          { text: 'ADR-0001 · core vs konfigurasi', link: '/adr/0001-core-vs-configuration' },
        ],
      },
      {
        text: 'Skills untuk AI coding',
        collapsed: true,
        items: [
          { text: 'Katalog skills', link: '/skills/' },
          { text: 'RFP · requirements', link: '/skills/rfp-requirements' },
          { text: 'RFP · classification & policy', link: '/skills/rfp-classification-policy' },
          { text: 'RFP · workflow & evidence', link: '/skills/rfp-workflow-evidence' },
          { text: 'RFP · ERP handoff', link: '/skills/rfp-erp-handoff' },
          { text: 'Write ADR', link: '/skills/write-architecture-decision' },
          { text: 'Review threat model', link: '/skills/review-threat-model' },
          { text: 'Review accessibility', link: '/skills/review-accessibility' },
          { text: 'Review API contract', link: '/skills/review-api-contract' },
        ],
      },
    ],
    search: { provider: 'local' },
    outline: { label: 'Di halaman ini', level: [2, 3] },
    docFooter: { prev: 'Sebelumnya', next: 'Berikutnya' },
    lastUpdated: { text: 'Diperbarui' },
    footer: {
      message: 'Blueprint berstatus usulan. Keputusan bisnis tetap memerlukan persetujuan pemiliknya.',
    },
  },
})
