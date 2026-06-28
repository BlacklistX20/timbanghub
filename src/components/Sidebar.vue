<template>
  <div>
    <div class="md:hidden fixed top-0 left-0 w-full h-16 bg-gray-900 border-b border-gray-700 z-40 flex items-center justify-between px-4 shadow-lg">
      <img src="../assets/84369.png" class="h-6 w-auto" alt="TimbangHub" />
      <button @click="isOpen = !isOpen" class="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg bg-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" @click="isOpen = false" class="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"></div>

    <aside :class="[
      'fixed left-0 top-0 h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300 z-50 flex flex-col group overflow-hidden',
      'w-64 md:w-20 md:hover:w-64', 
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0' 
    ]">
     
      <div class="h-16 md:h-20 flex shrink-0 items-center justify-between md:justify-center px-4 md:p-4 border-b border-gray-700 bg-gray-900">
        <img src="../assets/84368.png" class="h-10 w-auto hidden md:block md:group-hover:hidden transition-opacity" alt="Icon" />
        <img src="../assets/84369.png" class="h-6 w-auto hidden md:group-hover:block transition-opacity" alt="Text Logo" />
       
        <img src="../assets/84369.png" class="h-5 w-auto md:hidden" alt="Text Logo" />
        <button @click="isOpen = false" class="md:hidden text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <nav class="mt-4 flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-2 pb-4">
        <router-link @click="isOpen = false" to="/" :class="['flex items-center px-3 py-3 rounded-xl transition-all duration-200', route.path === '/' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700 hover:text-white']">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 whitespace-nowrap transition-opacity font-semibold">Dashboard</span>
        </router-link>

        <router-link @click="isOpen = false" to="/data" :class="['flex items-center px-3 py-3 rounded-xl transition-all duration-200', route.path === '/data' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700 hover:text-white']">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span class="ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 whitespace-nowrap transition-opacity font-semibold">Tabel Data</span>
        </router-link>

        <div class="pt-4 pb-2">
          <p class="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">Mesin Timbangan</p>
        </div>

        <router-link @click="isOpen = false" v-for="n in 4" :key="n" :to="`/timbangan/${n}`" :class="['flex items-center px-3 py-3 rounded-xl transition-all duration-200', route.path === `/timbangan/${n}` ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700 hover:text-white']">
          <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
          <span class="ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 whitespace-nowrap transition-opacity font-semibold">Timbangan {{ n }}</span>
        </router-link>
      </nav>

      <div class="p-3 border-t border-gray-700 bg-gray-900 mt-auto shrink-0">
        <div class="flex items-center justify-between w-56">
          
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 shrink-0 bg-gray-800 rounded-xl border border-gray-600 flex items-center justify-center text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            
            <div class="flex flex-col min-w-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <span class="text-sm font-bold text-white truncate w-24">{{ username }}</span>
              <span :class="role === 'admin' ? 'text-blue-400' : 'text-orange-400'" class="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                {{ role }}
              </span>
            </div>
          </div>

          <button @click="handleLogout" class="p-2.5 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 shrink-0" title="Keluar">
            <svg class="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>

        </div>
      </div>
      
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isOpen = ref(false)
const username = ref('')
const role = ref('')

onMounted(() => {
  // Mengambil nama dan role dari sessionStorage
  username.value = sessionStorage.getItem('username') || 'Pengguna'
  role.value = sessionStorage.getItem('role') || 'Operator'
})

const handleLogout = () => {
  // Bersihkan semua sesi di sessionStorage
  sessionStorage.clear()
  // Tendang kembali ke halaman login
  router.push('/login')
}
</script>