<template>
  <div class="max-w-7xl mx-auto pl-8 pb-10">
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
            class="w-full bg-gray-900 text-white pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
            placeholder="Cari tanggal atau waktu..." 
          />
        </div>

        <button 
          @click="isModalOpen = true" 
          class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center justify-center transition-colors shadow-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download Data
        </button>
      </div>
    </div>

    <div class="bg-gray-800 rounded-t-2xl shadow-lg border border-gray-700 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-900 text-gray-300 text-sm uppercase tracking-wider">
            <th rowspan="2" class="p-4 border-b border-r border-gray-700 w-16 text-center">No</th>
            <th rowspan="2" class="p-4 border-b border-r border-gray-700">Tanggal & Waktu</th>
            <th colspan="2" class="p-3 border-b border-r border-gray-700 text-center bg-blue-900/30">Group 1</th>
            <th colspan="2" class="p-3 border-b border-r border-gray-700 text-center bg-orange-900/30">Group 2</th>
            <th rowspan="2" class="p-4 border-b border-gray-700 text-center w-24">Aksi</th>
          </tr>
          <tr class="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
            <th class="p-3 border-b border-r border-gray-700 text-center">Tmbgn 1 (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700 text-center">Tmbgn 2 (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700 text-center">Tmbgn 3 (Kg)</th>
            <th class="p-3 border-b border-r border-gray-700 text-center">Tmbgn 4 (Kg)</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm">
          <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-gray-700/50 transition-colors">
            <td class="p-4 border-b border-gray-700 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="p-4 border-b border-gray-700 font-mono">{{ item.datetime }}</td>
            <td class="p-4 border-b border-gray-700 text-center text-blue-300">{{ item.t1.toFixed(2) }}</td>
            <td class="p-4 border-b border-gray-700 text-center text-blue-300">{{ item.t2.toFixed(2) }}</td>
            <td class="p-4 border-b border-gray-700 text-center text-orange-300">{{ item.t3.toFixed(2) }}</td>
            <td class="p-4 border-b border-gray-700 text-center text-orange-300">{{ item.t4.toFixed(2) }}</td>
            <td class="p-4 border-b border-gray-700 text-center">
              <button @click="deleteRow(item.id)" class="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded transition-colors" title="Hapus Data">
                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="7" class="p-8 text-center text-gray-500">
              Tidak ada data yang cocok dengan pencarian "{{ searchQuery }}".
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-gray-900 border border-t-0 border-gray-700 rounded-b-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="text-sm text-gray-400">
        Menampilkan <span class="font-bold text-white">{{ startIndex + 1 }}</span> sampai <span class="font-bold text-white">{{ endIndex }}</span> dari <span class="font-bold text-white">{{ filteredData.length }}</span> entri
      </div>
      
      <div class="flex items-center space-x-1">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Kembali
        </button>
        
        <button 
          v-for="page in totalPages" 
          :key="page" 
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 rounded border text-sm transition-colors',
            currentPage === page 
              ? 'bg-blue-600 border-blue-600 text-white font-bold' 
              : 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
          ]"
        >
          {{ page }}
        </button>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages || totalPages === 0"
          class="px-3 py-1 rounded border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Lanjut
        </button>
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

// -- STATE UNTUK MODAL DOWNLOAD --
const isModalOpen = ref(false)
const startDate = ref('')
const endDate = ref('')

// -- GENERATE DUMMY DATA DALAM JUMLAH BANYAK --
// Saya membuat 45 baris data agar Anda bisa melihat fitur halamannya berfungsi
const generateDummyData = () => {
  const data = []
  for (let i = 1; i <= 45; i++) {
    const day = (19 - (i % 5)).toString().padStart(2, '0') // Simulasi hari berbeda
    const hour = (8 + (i % 10)).toString().padStart(2, '0') // Simulasi jam berbeda
    const minute = (15 + i).toString().padStart(2, '0')
    
    data.push({
      id: i,
      datetime: `${day}/06/2026 ${hour}:${minute}:00`,
      t1: 100 + (Math.random() * 50),
      t2: 110 + (Math.random() * 50),
      t3: 0.00, // Misal Timbangan 3 masih berhenti
      t4: 120 + (Math.random() * 50),
    })
  }
  return data
}
const tableData = ref(generateDummyData())

// -- LOGIKA SEARCH & PAGINATION --
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10) // Menampilkan 10 data per halaman

// 1. Filter Data berdasarkan Search
const filteredData = computed(() => {
  if (!searchQuery.value) return tableData.value
  
  const query = searchQuery.value.toLowerCase()
  return tableData.value.filter(item => 
    item.datetime.toLowerCase().includes(query)
  )
})

// Jika user mengetik di kotak pencarian, kembalikan halaman ke nomor 1
watch(searchQuery, () => {
  currentPage.value = 1
})

// 2. Hitung Paginasi
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => {
  const end = startIndex.value + itemsPerPage.value
  return end > filteredData.value.length ? filteredData.value.length : end
})

// 3. Potong Data Sesuai Halaman Aktif
const paginatedData = computed(() => {
  return filteredData.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
})

// -- FUNGSI TOMBOL PAGINASI --
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const goToPage = (page) => {
  currentPage.value = page
}

// -- FUNGSI HAPUS BARIS --
const deleteRow = (id) => {
  const confirmDelete = confirm('Apakah Anda yakin ingin menghapus data ini?')
  if (confirmDelete) {
    tableData.value = tableData.value.filter(item => item.id !== id)
    // Cegah error jika baris terakhir di halaman terhapus
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  }
}

// -- FUNGSI DOWNLOAD --
const handleDownload = () => {
  if (!startDate.value || !endDate.value) {
    alert('Harap pilih Tanggal Mulai dan Tanggal Akhir!')
    return
  }
  alert(`Memulai download data dari ${startDate.value} sampai ${endDate.value}... (Simulasi API)`)
  isModalOpen.value = false
}
</script>