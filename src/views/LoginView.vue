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
        
        <!-- KOLOM PASSWORD YANG DIPERBARUI -->
        <div>
          <label class="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'" 
              class="w-full bg-gray-900 text-white pl-4 pr-12 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
              placeholder="••••••••" 
              required 
              :disabled="isLoading"
            />
            <!-- TOMBOL MATA -->
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none transition-colors"
            >
              <!-- Ikon Mata Tertutup (Tampilkan Password) -->
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.71-1.583c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.564 3.029m-5.858-.908a3 3 0 00-4.243-4.243m4.243 4.243L8 8" />
              </svg>
              <!-- Ikon Mata Terbuka (Sembunyikan Password) -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
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
const isLoading = ref(false) 
const showPassword = ref(false) // State baru untuk toggle password

const handleLogin = async () => {
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
      sessionStorage.setItem('isLoggedIn', 'true')
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('role', data.role)
      sessionStorage.setItem('username', data.username)

      router.push('/')
    } else {
      errorMessage.value = data.message || 'Username atau password salah!'
    }
  } catch (error) {
    console.error('Error saat login:', error)
    errorMessage.value = 'Tidak dapat terhubung ke server. Pastikan backend aktif.'
  } finally {
    isLoading.value = false
  }
}
</script>