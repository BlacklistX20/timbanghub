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
              Tidak ada data yang cocok dengan pencarian "{{ searchQuery }}".
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
        <p class="text-sm text-gray-400 mb-6">Pilih rentang tanggal untuk data yang ingin diunduh.</p>
        
        <div class="space-y-4 mb-8">
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Tanggal Mulai</label>
            <input type="date" v-model="startDate" class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
          </div>
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Tanggal Akhir</label>
            <input type="date" v-model="endDate" class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Batal</button>
          <button @click="handleDownload" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Proses Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const isModalOpen = ref(false)
const startDate = ref('')
const endDate = ref('')

// Generate Dummy Data dengan Waktu Independen
const generateDummyData = () => {
  const data = []
  for (let i = 1; i <= 45; i++) {
    // Timbangan beroperasi di waktu dan menit yang acak dan berbeda-beda
    const dt1 = `24/06/2026 08:${(i + 5).toString().padStart(2, '0')}:15`
    const dt2 = `24/06/2026 08:${(i + 7).toString().padStart(2, '0')}:30`
    const dt4 = `24/06/2026 08:${(i + 1).toString().padStart(2, '0')}:45`

    data.push({
      id: i,
      t1: { dt: dt1, w: 65 + (Math.random() * 5) },
      t2: { dt: dt2, w: 66 + (Math.random() * 5) },
      t3: { dt: '-', w: 0 }, // Simulasi timbangan mati / tidak ada data
      t4: { dt: dt4, w: 67 + (Math.random() * 5) },
    })
  }
  return data
}

const tableData = ref(generateDummyData())

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter pencarian kini mencari kecocokan waktu di semua timbangan
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

watch(searchQuery, () => {
  currentPage.value = 1
})

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

const handleDownload = () => {
  if (!startDate.value || !endDate.value) {
    alert('Harap pilih Tanggal Mulai dan Tanggal Akhir!')
    return
  }
  alert(`Memulai download data...`)
  isModalOpen.value = false
}
</script>