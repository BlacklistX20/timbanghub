<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      
      <img src="@/assets/logo-timbanghub.png" alt="TimbangHub Logo" class="mx-auto mb-2 m-auto h-auto">
      
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Halaman Login</h2>
      
      <form @submit.prevent="prosesLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Username: </label>
          <input type="text" v-model="username" placeholder="Masukkan Username" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Password: </label>
          <input type="password" v-model="password" placeholder="Masukkan Password" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        
        <button type="submit" 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Masuk
        </button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const prosesLogin = () => {
  if (username.value === 'admin' && password.value === '1234') {
    router.push('/data') 
  } else if (username.value === 'operator' && password.value === '1234') {
    router.push('/operator')
  } else {
    alert('Username atau Password salah! ')
  }
}
</script>

