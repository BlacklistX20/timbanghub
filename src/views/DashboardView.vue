<template>
  <div class="max-w-7xl mx-auto pl-8">
    <h1 class="text-3xl font-bold mb-8 text-white">Dashboard Utama</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-2xl shadow-lg border border-blue-700">
        <h2 class="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Total Akumulasi Pupuk</h2>
        <div class="text-4xl font-bold text-white">{{ totalWeight.toLocaleString() }} <span class="text-xl font-medium text-blue-300">Kg</span></div>
      </div>
      
      <div class="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-600">
        <h2 class="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-2">Status Timbangan Beroperasi</h2>
        <div class="text-4xl font-bold text-white">
          <span class="text-green-400">{{ activeScales }}</span> / {{ scales.length }}
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold mb-4 text-gray-200">Monitoring Real-time</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="scale in scales" :key="scale.id" class="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors shadow-md relative overflow-hidden">
        
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-bold text-lg text-white">Timbangan {{ scale.id }}</h3>
          <span :class="scale.status === 'running' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'" class="px-3 py-1 text-xs font-semibold rounded-full border">
            {{ scale.status.toUpperCase() }}
          </span>
        </div>

        <div class="mt-4">
          <p class="text-gray-400 text-sm mb-1">Berat Saat Ini</p>
          <div class="text-3xl font-mono font-bold" :class="scale.status === 'running' ? 'text-blue-400' : 'text-gray-500'">
            {{ scale.realtimeWeight.toFixed(2) }} <span class="text-base text-gray-400">Kg</span>
          </div>
        </div>

        <router-link :to="`/timbangan/${scale.id}`" class="mt-6 block text-center w-full py-2 bg-gray-700 hover:bg-gray-600 text-sm font-semibold rounded transition-colors">
          Lihat Detail
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dummy Data Realtime
const scales = ref([
  { id: 1, status: 'running', realtimeWeight: 1045.50 },
  { id: 2, status: 'running', realtimeWeight: 890.20 },
  { id: 3, status: 'stopped', realtimeWeight: 0.00 },
  { id: 4, status: 'running', realtimeWeight: 1205.80 },
])

const totalWeight = ref(245900) // Contoh akumulasi besar
const activeScales = computed(() => scales.value.filter(s => s.status === 'running').length)
</script>

