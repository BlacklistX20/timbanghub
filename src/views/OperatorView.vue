<template>
  <div class="min-h-screen bg-gray-50 flex font-sans">
    
    <aside 
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="fixed top-0 left-0 h-screen bg-white shadow-xl transition-all duration-300 w-16 hover:w-64 flex flex-col overflow-hidden group z-50"
    >

      <div class="h-16 flex items-center px-4 shrink-0 border-b border-gray-100">
        <img src="@/assets/icon-timbanghub.png" alt="Icon" class="h-10 w-10 object-contain shrink-0">
        <img src="@/assets/title-timbanghub.png" alt="TimbangHub" class="h-8 ml-2 object-contain shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>

      <nav class="flex-1 py-4 px-2 space-y-2">
        
      </nav>

      <div class="p-2 border-t border-gray-100">
        <button @click="logout" class="flex items-center w-full px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
          <Icon icon="mdi:logout" class="h-6 w-6 shrink-0" />
          <span class="ml-4 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Keluar
          </span>
        </button>
      </div>

    </aside>

    <main 
      :class="isHovered ? 'ml-64' : 'ml-16'"
      class="flex-1 p-8 w-full mx-auto transition-all duration-300"
    >
      
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Panel Operator Pemuatan</h1>

    <div class="mb-4">
      <button @click="isModalOpen = true" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm flex items-center transition-colors">
        <Icon icon="mdi:plus-circle-outline" class="h-5 w-5 mr-2" />
        New Process
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-700 border-b-2 border-gray-200">
          <tr>
            <th class="p-4 font-semibold">ID Pemuatan</th>
            <th class="p-4 font-semibold">Group Timbangan</th>
            <th class="p-4 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proses in prosesAktif" :key="proses.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="p-4 font-mono text-blue-800 font-medium">{{ proses.idPemuatan }}</td>
            <td class="p-4">{{ proses.grup }}</td>
            <td class="p-4 text-center">
              <button @click="selesaiProses(proses.idPemuatan)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
                Selesai / Berhenti
              </button>
            </td>
          </tr>
          <tr v-if="prosesAktif.length === 0">
            <td colspan="3" class="p-8 text-center text-gray-500 italic">
              Belum ada proses pemuatan yang aktif. Klik "New Process" untuk memulai.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 class="text-xl font-bold mb-4">Mulai Proses Baru</h2>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Pilih Group Timbangan:</label>
          <select v-model="grupPilihan" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button @click="isModalOpen = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium">Batal</button>
          <button @click="mulaiProses" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-bold shadow-sm">Start</button>
        </div>
      </div>
    </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// Variabel penanda apakah sidebar sedang disentuh kursor atau tidak
const isHovered = ref(false)

// Variabel State
const isModalOpen = ref(false)
const grupPilihan = ref('Group 1')
const prosesAktif = ref([])

// Fungsi saat tombol "Start" di klik
const mulaiProses = () => {
  // 1. Buat ID unik sederhana (misal: TRK-1234)
  const idBaru = 'TRK-' + Math.floor(1000 + Math.random() * 9000)
  
  // 2. Masukkan data ke tabel (array)
  prosesAktif.value.push({
    id: Date.now(), // ID unik internal untuk Vue (v-for key)
    idPemuatan: idBaru,
    grup: grupPilihan.value
  })

  // 3. Tutup jendela modal
  isModalOpen.value = false
}

// Fungsi saat tombol "Selesai / Berhenti" di klik
const selesaiProses = (idYangSelesai) => {
  // Simpan semua proses yang ID-nya BUKAN idYangSelesai
  prosesAktif.value = prosesAktif.value.filter(proses => proses.idPemuatan !== idYangSelesai)
}
</script>
