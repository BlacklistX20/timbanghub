<template>
  <div class="max-w-7xl mx-auto pl-8 pb-10 pr-8 md:pr-0">
    <div class="flex flex-col mb-8">
      <h1 class="text-3xl font-bold text-white mb-6">Data Keseluruhan Timbangan</h1>
      
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="relative w-full sm:w-72">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="w-full bg-gray-900 text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors" 
            placeholder="Cari tanggal atau waktu..." 
          />
        </div>

        <button @click="isModalOpen = true" class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center justify-center transition-colors shadow-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download Data
        </button>
      </div>
    </div>

    <div class="bg-gray-800 rounded-t-2xl shadow-lg border border-gray-700 overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr class="bg-gray-900 text-gray-300 text-sm uppercase tracking-wider text-center">
            <th rowspan="2" class="p-4 border-b border-r border-gray-700 w-16">No</th>
            <th colspan="2" class="p-3 border-b border-r border-gray-700 bg-blue-900/30 text-blue-200">Timbangan 1</th>
            <th colspan="2" class="p-3 border-b border-r border-gray-700 bg-emerald-900/30 text-emerald-200">Timbangan 2</th>
            <th colspan="2" class="p-3 border-b border-r border-gray-700 bg-orange-900/30 text-orange-200">Timbangan 3</th>
            <th colspan="2" class="p-3 border-b border-gray-700 bg-purple-900/30 text-purple-200">Timbangan 4</th>
          </tr>
          <tr class="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider text-center">
            <th class="p-3 border-b border-r border-gray-700">Waktu</th>
            <th class="p-3 border-b border-r border-gray-700">Berat (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700">Waktu</th>
            <th class="p-3 border-b border-r border-gray-700">Berat (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700">Waktu</th>
            <th class="p-3 border-b border-r border-gray-700">Berat (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700">Waktu</th>
            <th class="p-3 border-b border-gray-700">Berat (Kg)</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm">
          <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-gray-700/50 transition-colors">
            <td class="p-4 border-b border-r border-gray-700 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            
            <td class="p-3 border-b border-gray-700 font-mono text-xs text-center">{{ item.t1.dt }}</td>
            <td class="p-3 border-b border-r border-gray-700 text-center font-bold text-blue-300">{{ item.t1.w > 0 ? item.t1.w.toFixed(2) : '-' }}</td>
            
            <td class="p-3 border-b border-gray-700 font-mono text-xs text-center">{{ item.t2.dt }}</td>
            <td class="p-3 border-b border-r border-gray-700 text-center font-bold text-emerald-300">{{ item.t2.w > 0 ? item.t2.w.toFixed(2) : '-' }}</td>
            
            <td class="p-3 border-b border-gray-700 font-mono text-xs text-center">{{ item.t3.dt }}</td>
            <td class="p-3 border-b border-r border-gray-700 text-center font-bold text-orange-300">{{ item.t3.w > 0 ? item.t3.w.toFixed(2) : '-' }}</td>
            
            <td class="p-3 border-b border-gray-700 font-mono text-xs text-center">{{ item.t4.dt }}</td>
            <td class="p-3 border-b border-gray-700 text-center font-bold text-purple-300">{{ item.t4.w > 0 ? item.t4.w.toFixed(2) : '-' }}</td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="9" class="p-8 text-center text-gray-500">
              Tidak ada data yang cocok.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-gray-900 border border-t-0 border-gray-700 rounded-b-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="text-sm text-gray-400">
        Menampilkan <span class="font-bold text-white">{{ filteredData.length > 0 ? startIndex + 1 : 0 }}</span> 
        sampai <span class="font-bold text-white">{{ endIndex }}</span> dari <span class="font-bold text-white">{{ filteredData.length }}</span> entri
      </div>
      
      <div class="flex items-center space-x-1">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Kembali</button>
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 rounded border text-sm transition-colors', currentPage === page ? 'bg-blue-600 border-blue-600 text-white font-bold' : 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white']">{{ page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0" class="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Lanjut</button>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div class="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
        <h2 class="text-xl font-bold text-white mb-4">Download Data Timbangan</h2>
        <p class="text-sm text-gray-400 mb-6">Pilih rentang tanggal dan format file untuk diunduh.</p>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Tanggal Mulai</label>
            <input type="date" v-model="startDate" class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
          </div>
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Tanggal Akhir</label>
            <input type="date" v-model="endDate" class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
          </div>
        </div>

        <div class="mb-8">
          <label class="block text-gray-300 text-sm font-semibold mb-3">Format File</label>
          <div class="flex items-center space-x-6">
            <label class="flex items-center space-x-2 cursor-pointer group">
              <input type="radio" v-model="exportFormat" value="excel" class="w-4 h-4 text-green-600 bg-gray-900 border-gray-600 focus:ring-green-600 focus:ring-2">
              <span class="text-gray-300 group-hover:text-white transition-colors">Excel (.xlsx)</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer group">
              <input type="radio" v-model="exportFormat" value="pdf" class="w-4 h-4 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-600 focus:ring-2">
              <span class="text-gray-300 group-hover:text-white transition-colors">PDF (.pdf)</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Batal</button>
          <button @click="handleDownload" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center">
            <svg v-if="isDownloading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ isDownloading ? 'Memproses...' : 'Download Sekarang' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable' // Ubah baris ini

const isModalOpen = ref(false)
const isDownloading = ref(false)
const startDate = ref('')
const endDate = ref('')
const exportFormat = ref('excel') // Default terpilih

const tableData = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/timbangan/semua-data`)
    const data = await res.json()
    tableData.value = data
  } catch (error) {
    console.error('Gagal memuat data Tabel:', error)
  }
})

const filteredData = computed(() => {
  if (!searchQuery.value) return tableData.value
  const query = searchQuery.value.toLowerCase()
  return tableData.value.filter(item => 
    item.t1.dt.toLowerCase().includes(query) ||
    item.t2.dt.toLowerCase().includes(query) ||
    item.t3.dt.toLowerCase().includes(query) ||
    item.t4.dt.toLowerCase().includes(query)
  )
})

watch(searchQuery, () => { currentPage.value = 1 })

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage.value
  return end > filteredData.value.length ? filteredData.value.length : end
})
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, startIndex.value + itemsPerPage.value))

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const goToPage = (page) => { currentPage.value = page }

// FUNGSI KONVERSI TANGGAL DARI STRING KE TIMESTAMP (Untuk logika filter rentang tanggal)
const parseDateString = (dtStr) => {
  if (!dtStr || dtStr === '-') return null
  const [datePart, timePart] = dtStr.split(' ')
  if (!datePart) return null
  const [day, month, year] = datePart.split('/')
  return new Date(`${year}-${month}-${day}T${timePart || '00:00:00'}`).getTime()
}

// FUNGSI UTAMA DOWNLOAD
const handleDownload = () => {
  if (!startDate.value || !endDate.value) {
    alert('Harap pilih Tanggal Mulai dan Tanggal Akhir secara lengkap!')
    return
  }

  isDownloading.value = true

  setTimeout(() => {
    try {
      // 1. Filter Data Berdasarkan Rentang Tanggal
      const startT = new Date(`${startDate.value}T00:00:00`).getTime()
      const endT = new Date(`${endDate.value}T23:59:59`).getTime()

      const dataToExport = tableData.value.filter(item => {
        const dates = [
          parseDateString(item.t1.dt), parseDateString(item.t2.dt),
          parseDateString(item.t3.dt), parseDateString(item.t4.dt)
        ].filter(d => d !== null)

        if (dates.length === 0) return false

        const minDate = Math.min(...dates)
        const maxDate = Math.max(...dates)

        return maxDate >= startT && minDate <= endT
      })

      if (dataToExport.length === 0) {
        alert('Tidak ada data timbangan pada rentang tanggal yang dipilih.')
        isDownloading.value = false
        return
      }

      // 2. Eksekusi Export
      if (exportFormat.value === 'excel') {
        exportToExcel(dataToExport)
      } else {
        exportToPDF(dataToExport)
      }

      // 3. TAMBAHAN: Fungsi Reset Tanggal Setelah Berhasil Download
      startDate.value = ''
      endDate.value = ''

    } catch (error) {
      console.error("Terjadi kesalahan saat memproses file:", error)
      alert("Gagal membuat dokumen, silakan coba lagi.")
    } finally {
      // Baris ini memastikan efek loading SELALU mati walau terjadi error
      isDownloading.value = false
      isModalOpen.value = false
    }
  }, 500)
}

// FUNGSI EXPORT KE EXCEL
const exportToExcel = (data) => {
  const formattedData = data.map((item, idx) => ({
    'No': idx + 1,
    'Waktu T1': item.t1.dt,
    'Berat T1 (Kg)': item.t1.w > 0 ? item.t1.w : '-',
    'Waktu T2': item.t2.dt,
    'Berat T2 (Kg)': item.t2.w > 0 ? item.t2.w : '-',
    'Waktu T3': item.t3.dt,
    'Berat T3 (Kg)': item.t3.w > 0 ? item.t3.w : '-',
    'Waktu T4': item.t4.dt,
    'Berat T4 (Kg)': item.t4.w > 0 ? item.t4.w : '-'
  }))

  const worksheet = XLSX.utils.json_to_sheet(formattedData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Timbangan")
  XLSX.writeFile(workbook, `Laporan_TimbangHub_${startDate.value}_sd_${endDate.value}.xlsx`)
}

// FUNGSI EXPORT KE PDF
const exportToPDF = (data) => {
  const doc = new jsPDF('landscape', 'pt', 'a4')
  
  doc.setFontSize(16)
  doc.text("Laporan Data Timbangan Gudang (TimbangHub)", 40, 40)
  doc.setFontSize(10)
  doc.text(`Periode: ${startDate.value} sampai ${endDate.value}`, 40, 60)

  const tableColumn = [
    [
      { content: 'No', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
      { content: 'Timbangan 1', colSpan: 2, styles: { halign: 'center' } },
      { content: 'Timbangan 2', colSpan: 2, styles: { halign: 'center' } },
      { content: 'Timbangan 3', colSpan: 2, styles: { halign: 'center' } },
      { content: 'Timbangan 4', colSpan: 2, styles: { halign: 'center' } }
    ],
    [
      'Waktu', 'Berat (Kg)', 'Waktu', 'Berat (Kg)', 'Waktu', 'Berat (Kg)', 'Waktu', 'Berat (Kg)'
    ]
  ]

  const tableRows = data.map((item, idx) => [
    idx + 1,
    item.t1.dt, item.t1.w > 0 ? item.t1.w.toFixed(2) : '-',
    item.t2.dt, item.t2.w > 0 ? item.t2.w.toFixed(2) : '-',
    item.t3.dt, item.t3.w > 0 ? item.t3.w.toFixed(2) : '-',
    item.t4.dt, item.t4.w > 0 ? item.t4.w.toFixed(2) : '-'
  ])

  autoTable(doc, {
    head: tableColumn,
    body: tableRows,
    startY: 80,
    theme: 'grid',
    headStyles: { fillColor: [31, 41, 55], textColor: 255 },
    styles: { fontSize: 8, cellPadding: 4, halign: 'center' },
  })

  doc.save(`Laporan_TimbangHub_${startDate.value}_sd_${endDate.value}.pdf`)
}
</script>