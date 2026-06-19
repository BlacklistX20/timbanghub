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
      'fixed left-0 top-0 h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300 z-50 overflow-y-auto flex flex-col group',
      'w-64 md:w-20 md:hover:w-64', // Lebar full di HP, hover lebar di PC
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0' // Geser menu di HP
    ]">
      
      <div class="h-16 md:h-20 flex items-center justify-between md:justify-center px-4 md:p-4 border-b border-gray-700 bg-gray-900">
        <img src="../assets/84368.png" class="h-10 w-auto hidden md:block md:group-hover:hidden transition-opacity" alt="Icon" />
        <img src="../assets/84369.png" class="h-6 w-auto hidden md:group-hover:block transition-opacity" alt="Text Logo" />
        
        <img src="../assets/84369.png" class="h-5 w-auto md:hidden" alt="Text Logo" />
        <button @click="isOpen = false" class="md:hidden text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <nav class="mt-4 flex-1 px-3 space-y-2">
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

      <div class="p-3 border-t border-gray-700">
        <button @click="handleLogout" class="w-full flex items-center px-3 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-colors text-left group/logout">
          <svg class="w-6 h-6 flex-shrink-0 transition-transform group-hover/logout:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span class="ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 whitespace-nowrap transition-opacity font-semibold">Keluar</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isOpen = ref(false) // State untuk menu HP

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>