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
          />
        </div>

        <div v-if="errorMessage" class="text-red-400 text-sm font-semibold bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
          {{ errorMessage }}
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg">
          Masuk
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin') {
    errorMessage.value = ''
    
    // Simpan status login ke localStorage
    localStorage.setItem('isLoggedIn', 'true')
    
    // Arahkan ke Dashboard
    router.push('/')
  } else {
    errorMessage.value = 'Username atau Password salah!'
  }
}
</script>