<script setup lang="ts">
import { computed, ref } from 'vue'

const stages = [
  {
    label: 'Pengajuan',
    title: 'Ajukan kasus pembayaran',
    description: 'Pemohon melengkapi konteks bisnis, penerima, instruksi pembayaran, dan dokumen pendukung sebelum mengirim pengajuan.',
    owner: 'Pemohon',
    evidence: 'Revisi pengajuan dan dokumen sumber',
    guarantee: 'Data wajib dan asal dokumen tervalidasi',
    link: './03-srs-fsd',
    linkLabel: 'Baca spesifikasi fungsional'
  },
  {
    label: 'Verifikasi',
    title: 'Periksa kelengkapan dan aturan',
    description: 'Verifikator memeriksa bukti dan aturan bisnis. Pengajuan yang belum sesuai dikembalikan dengan alasan yang dapat ditelusuri.',
    owner: 'Verifikator',
    evidence: 'Hasil pemeriksaan dan alasan pengembalian',
    guarantee: 'Perubahan dan keputusan tercatat dalam audit',
    link: './04-ui-ux-user-flows',
    linkLabel: 'Lihat alur pengguna'
  },
  {
    label: 'Persetujuan',
    title: 'Ambil keputusan berwenang',
    description: 'Persetujuan mengikuti matriks otorisasi organisasi dan konteks pengajuan yang berlaku pada versi kebijakan tersebut.',
    owner: 'Penyetuju berwenang',
    evidence: 'Identitas, waktu, dan dasar keputusan',
    guarantee: 'Otorisasi dan integritas transisi status',
    link: './07-security-operations',
    linkLabel: 'Baca keamanan dan operasi'
  },
  {
    label: 'Integrasi',
    title: 'Serahkan ke sistem keuangan',
    description: 'Adaptor mengirim instruksi yang sudah diotorisasi ke ERP atau sistem pembayaran melalui kontrak integrasi yang jelas.',
    owner: 'Operasi keuangan dan adaptor',
    evidence: 'Referensi eksternal dan hasil pengiriman',
    guarantee: 'Idempotensi dan jejak kegagalan integrasi',
    link: './06-architecture',
    linkLabel: 'Lihat arsitektur integrasi'
  },
  {
    label: 'Rekonsiliasi',
    title: 'Cocokkan hasil pembayaran',
    description: 'Status akhir diperbarui berdasarkan bukti penyelesaian dari sistem hilir, bukan hanya status persetujuan di portal.',
    owner: 'Operasi keuangan',
    evidence: 'Status penyelesaian dan referensi transaksi',
    guarantee: 'Konsistensi status dan audit lintas sistem',
    link: './05-domain-model',
    linkLabel: 'Pelajari model domain'
  }
] as const

const selectedIndex = ref(0)
const selectedStage = computed(() => stages[selectedIndex.value])
</script>

<template>
  <section class="rfp-process" aria-labelledby="rfp-process-title">
    <div class="rfp-process-heading">
      <div>
        <p class="rfp-process-eyebrow">Peta proses · rancangan konseptual</p>
        <h2 id="rfp-process-title">Dari pengajuan hingga rekonsiliasi</h2>
      </div>
      <span class="rfp-process-counter">{{ String(selectedIndex + 1).padStart(2, '0') }} / 05</span>
    </div>

    <div class="rfp-process-steps" aria-label="Pilih tahap proses">
      <button
        v-for="(stage, index) in stages"
        :key="stage.label"
        type="button"
        class="rfp-process-step"
        :class="{ 'is-active': selectedIndex === index }"
        :aria-pressed="selectedIndex === index"
        @click="selectedIndex = index"
      >
        <span class="rfp-process-step-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span>{{ stage.label }}</span>
      </button>
    </div>

    <div class="rfp-process-detail" aria-live="polite">
      <div class="rfp-process-detail-main">
        <p class="rfp-process-phase">Tahap {{ String(selectedIndex + 1).padStart(2, '0') }}</p>
        <h3>{{ selectedStage.title }}</h3>
        <p>{{ selectedStage.description }}</p>
        <a :href="selectedStage.link">{{ selectedStage.linkLabel }} <span aria-hidden="true">↗</span></a>
      </div>
      <dl class="rfp-process-facts">
        <div><dt>Penanggung jawab</dt><dd>{{ selectedStage.owner }}</dd></div>
        <div><dt>Bukti utama</dt><dd>{{ selectedStage.evidence }}</dd></div>
        <div><dt>Jaminan platform</dt><dd>{{ selectedStage.guarantee }}</dd></div>
      </dl>
    </div>
  </section>
</template>
