<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center space-x-4 mb-8">
      <router-link to="/" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </router-link>
      <h1 class="text-3xl font-bold text-white">Detail Timbangan {{ id }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h2 class="text-gray-400 text-sm font-semibold mb-1">Status Mesin</h2>
        <div class="flex items-center space-x-3 mt-2">
          <div :class="scaleData.status === 'running' ? 'bg-green-500' : 'bg-red-500'" class="w-4 h-4 rounded-full animate-pulse"></div>
          <span class="text-2xl font-bold text-white capitalize">{{ scaleData.status }}</span>
        </div>
      </div>
      
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h2 class="text-gray-400 text-sm font-semibold mb-1">Berat Real-time</h2>
        <div class="text-3xl font-mono font-bold text-blue-400 mt-2">
          {{ scaleData.realtime.toFixed(2) }} <span class="text-lg text-gray-500">Kg</span>
        </div>
      </div>
      
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h2 class="text-gray-400 text-sm font-semibold mb-1">Total Ditimbang (Kg) Hari Ini</h2>
        <div class="text-3xl font-bold text-blue-300 mt-2">
          {{ scaleData.totalKg.toLocaleString() }} <span class="text-lg text-gray-500">Kg</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex justify-between items-center">
        <div>
          <h2 class="text-gray-400 text-sm font-semibold mb-1">Total Karung Keseluruhan</h2>
          <div class="text-3xl font-bold text-orange-400 mt-2">
            {{ scaleData.totalSacks.toLocaleString() }} <span class="text-lg text-gray-500">Karung</span>
          </div>
        </div>
        <div class="p-4 bg-orange-500/10 rounded-full text-orange-400 hidden sm:block">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
        </div>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex justify-between items-center">
        <div>
          <h2 class="text-gray-400 text-sm font-semibold mb-1">Karung Hari Ini</h2>
          <div class="text-3xl font-bold text-emerald-400 mt-2">
            {{ scaleData.dailySacks.toLocaleString() }} <span class="text-lg text-gray-500">Karung</span>
          </div>
        </div>
        <div class="p-4 bg-emerald-500/10 rounded-full text-emerald-400 hidden sm:block">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      </div>
    </div>

    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 class="text-lg font-bold text-white mb-6">Grafik Aktivitas Berat (Area Chart)</h2>
      <div class="h-[400px] w-full">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler)

const props = defineProps(['id'])

// Data Dummy Ditambahkan totalSacks dan dailySacks
const scaleData = ref({
  status: 'running',
  realtime: 1250.5,
  totalKg: 45020,
  totalSacks: 900,
  dailySacks: 45
})

const chartData = ref({
  labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  datasets: [{
    label: 'Berat Timbangan (Kg)',
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderColor: '#2563eb',
    pointBackgroundColor: '#2563eb',
    pointBorderColor: '#fff',
    fill: true,
    tension: 0.4,
    data: [400, 800, 600, 1200, 1000, 1400, 900, 1100, 1300]
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } },
    x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
  }
}

onMounted(() => {
  if (props.id === '3') {
    scaleData.value.status = 'stopped'
    scaleData.value.realtime = 0
  }
})
</script>