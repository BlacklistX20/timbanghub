<template>
  <div class="min-h-screen flex items-center justify-center -m-8 bg-gray-950">
    <div class="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
      <div class="text-center mb-8">
        <img src="../assets/84364.png" alt="TimbangHub Logo" class="w-48 mx-auto mb-4" />
        <p class="text-gray-400 text-sm">Masuk untuk mengakses dasbor timbangan.</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-gray-300 text-sm font-bold mb-2">Username</label>
          <input 
            v-model="username"
            type="text" 
            class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
            placeholder="Masukkan username" 
            required 
            :disabled="isLoading"
          />
        </div>
        <div>
          <label class="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
            placeholder="••••••••" 
            required 
            :disabled="isLoading"
          />
        </div>

        <div v-if="errorMessage" class="text-red-400 text-sm font-semibold bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center transition-all">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </span>
          <span v-else>Masuk</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false) // State untuk memantau proses fetch

const handleLogin = async () => {
  // Reset pesan error dan nyalakan efek loading
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      // 1. Simpan tanda bahwa user sudah login (untuk Route Guard)
      sessionStorage.setItem('isLoggedIn', 'true')
      
      // 2. Simpan Data Rahasia & Identitas (JWT Token, Role, Username)
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('role', data.role)
      sessionStorage.setItem('username', data.username)
      
      // 3. Arahkan ke Dashboard
      router.push('/')
    } else {
      // Jika salah, tangkap pesan error yang dikirim oleh Express.js Backend
      errorMessage.value = data.message || 'Username atau password salah!'
    }
  } catch (error) {
    console.error('Error saat login:', error)
    // Error ini muncul jika backend belum dinyalakan atau internet terputus
    errorMessage.value = 'Tidak dapat terhubung ke server. Pastikan backend aktif.'
  } finally {
    // Matikan efek loading apa pun hasil akhirnya (sukses/gagal)
    isLoading.value = false
  }
}
</script>