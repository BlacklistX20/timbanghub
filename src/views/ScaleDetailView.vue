<template>
  <div class="max-w-7xl mx-auto pl-8">
    <div class="flex items-center space-x-4 mb-8">
      <router-link to="/" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </router-link>
      <h1 class="text-3xl font-bold text-white">Detail Timbangan {{ id }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <h2 class="text-gray-400 text-sm font-semibold mb-1">Total Ditimbang Hari Ini</h2>
        <div class="text-3xl font-bold text-orange-400 mt-2">
          {{ scaleData.total.toLocaleString() }} <span class="text-lg text-gray-500">Kg</span>
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
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler // Diperlukan untuk efek Area (warna di bawah garis)
} from 'chart.js'

// Registrasi komponen Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler
)

const props = defineProps(['id'])

const scaleData = ref({
  status: 'running',
  realtime: 1250.5,
  total: 45020
})

// Konfigurasi Data Grafik
const chartData = ref({
  labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  datasets: [
    {
      label: 'Berat Timbangan (Kg)',
      backgroundColor: 'rgba(37, 99, 235, 0.2)', // Warna area (biru transparan)
      borderColor: '#2563eb', // Warna garis (biru)
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#fff',
      fill: true, // AKTIFKAN AREA FILL
      tension: 0.4, // Membuat garis melengkung (smooth)
      data: [400, 800, 600, 1200, 1000, 1400, 900, 1100, 1300]
    }
  ]
})

// Konfigurasi Tampilan Grafik
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Sembunyikan label legend agar lebih bersih
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' // Warna garis grid
      },
      ticks: {
        color: '#9ca3af' // Warna teks angka Y
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#9ca3af' // Warna teks waktu X
      }
    }
  }
}

onMounted(() => {
  if (props.id === '3') {
    scaleData.value.status = 'stopped'
    scaleData.value.realtime = 0
  }
})
</script>