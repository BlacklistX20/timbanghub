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
        <a href="#" class="flex items-center px-3 py-2.5 text-blue-600 bg-blue-50 rounded-lg transition-colors">
          <Icon icon="mdi:scale-balance" class="h-6 w-6 shrink-0" />
          <span class="ml-4 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Data Timbangan
          </span>
        </a>
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
      
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Data Timbangan</h1>

      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="w-full border-collapse border border-gray-200 text-center text-sm text-gray-700">
          <thead class="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th rowspan="2" class="border border-gray-200 p-3">Tanggal & Waktu</th>
              <th colspan="2" class="border border-gray-200 p-3 bg-blue-50/50 text-blue-800">Group 1</th>
              <th colspan="2" class="border border-gray-200 p-3 bg-amber-50/50 text-amber-800">Group 2</th>
            </tr>
            <tr>
              <th class="border border-gray-200 p-2 bg-blue-50/30 text-gray-600">Timbangan 1</th>
              <th class="border border-gray-200 p-2 bg-blue-50/30 text-gray-600">Timbangan 2</th>
              <th class="border border-gray-200 p-2 bg-amber-50/30 text-gray-600">Timbangan 3</th>
              <th class="border border-gray-200 p-2 bg-amber-50/30 text-gray-600">Timbangan 4</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataTimbangan" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="border border-gray-200 p-3 font-mono text-gray-600">{{ item.waktu }}</td>
              <td class="border border-gray-200 p-3 font-medium">{{ item.t1 }} kg</td>
              <td class="border border-gray-200 p-3 font-medium">{{ item.t2 }} kg</td>
              <td class="border border-gray-200 p-3 font-medium">{{ item.t3 }} kg</td>
              <td class="border border-gray-200 p-3 font-medium">{{ item.t4 }} kg</td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import logoIcon from '@/assets/icon-timbanghub.png'
// import logoTitle from '@/assets/title-timbanghub.png'
// Memanggil komponen Icon dari Iconify
import { Icon } from '@iconify/vue'

const router = useRouter()

// Variabel penanda apakah sidebar sedang disentuh kursor atau tidak
const isHovered = ref(false)

const dataTimbangan = ref([
  { id: 1, waktu: '15:06:2026 08:00:12', t1: 250, t2: 245, t3: 310, t4: 305 },
  { id: 2, waktu: '15:06:2026 10:15:45', t1: 260, t2: 255, t3: 315, t4: 312 },
  { id: 3, waktu: '15:06:2026 13:30:22', t1: 248, t2: 250, t3: 308, t4: 300 }
])

const logout = () => {
  router.push('/')
}
</script>

