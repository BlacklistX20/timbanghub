<template>
  <div class="max-w-7xl mx-auto pl-8 pb-10 pr-8 md:pr-0">
    <div class="flex flex-col mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Manajemen Pengguna</h1>
      <p class="text-gray-400 mb-6">Kelola akses akun, role, dan kredensial pengguna aplikasi.</p>
      
      <div class="flex justify-between items-center">
        <!-- Kotak Pencarian Opsional (Bisa dikembangkan nanti) -->
        <div class="text-sm text-gray-400">
          Total Akun Terdaftar: <span class="font-bold text-white">{{ users.length }}</span>
        </div>

        <button @click="openAddModal" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center justify-center transition-colors shadow-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah User Baru
        </button>
      </div>
    </div>

    <!-- TABEL DATA USER -->
    <div class="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr class="bg-gray-900 text-gray-300 text-sm uppercase tracking-wider">
            <th class="p-4 border-b border-gray-700 text-center w-12">No</th>
            <th class="p-4 border-b border-gray-700">Username</th>
            <th class="p-4 border-b border-gray-700">Email</th>
            <th class="p-4 border-b border-gray-700 text-center">Role</th>
            <th class="p-4 border-b border-gray-700">Last Login</th>
            <th class="p-4 border-b border-gray-700">Created At</th>
            <th class="p-4 border-b border-gray-700 text-center w-32">Aksi</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm">
          <tr v-for="(user, index) in users" :key="user.id" class="hover:bg-gray-700/50 transition-colors">
            <td class="p-4 border-b border-gray-700 text-center">{{ index + 1 }}</td>
            <td class="p-4 border-b border-gray-700 font-bold text-white">{{ user.username }}</td>
            <td class="p-4 border-b border-gray-700">{{ user.email || '-' }}</td>
            <td class="p-4 border-b border-gray-700 text-center">
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getRoleBadgeColor(user.role)]">
                {{ user.role }}
              </span>
            </td>
            <td class="p-4 border-b border-gray-700 text-xs text-gray-400">{{ formatDate(user.lastLogin) }}</td>
            <td class="p-4 border-b border-gray-700 text-xs">{{ formatDate(user.createdAt) }}</td>
            <td class="p-4 border-b border-gray-700 text-center">
              <div class="flex items-center justify-center space-x-3">
                <button @click="openEditModal(user)" class="text-blue-400 hover:text-blue-300 transition-colors" title="Edit Akun">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button @click="handleDelete(user.id, user.username)" class="text-red-400 hover:text-red-300 transition-colors" title="Hapus Akun">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="users.length === 0 && !isLoading">
            <td colspan="7" class="p-8 text-center text-gray-500">Belum ada data pengguna.</td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="7" class="p-8 text-center text-blue-400 animate-pulse">Memuat data...</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL FORM (UNTUK TAMBAH DAN EDIT) -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div class="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-screen overflow-y-auto my-4">
        <h2 class="text-xl font-bold text-white mb-4">{{ isEditMode ? 'Edit Pengguna' : 'Daftarkan Pengguna Baru' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Username <span class="text-red-500">*</span></label>
            <input v-model="formData.username" type="text" required class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" placeholder="Masukkan username">
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input v-model="formData.email" type="email" class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" placeholder="opsional@mail.com">
          </div>

          <!-- INPUT PASSWORD -->
          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">
              Password <span v-if="!isEditMode" class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model="formData.password" 
                :type="showPassword ? 'text' : 'password'" 
                :required="!isEditMode" 
                class="w-full bg-gray-900 text-white pl-4 pr-12 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" 
                :placeholder="isEditMode ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password'"
              >
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none transition-colors">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.71-1.583c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.564 3.029m-5.858-.908a3 3 0 00-4.243-4.243m4.243 4.243L8 8" /></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
          </div>

          <!-- INPUT KONFIRMASI PASSWORD -->
          <div v-if="!isEditMode || (isEditMode && formData.password.length > 0)">
            <label class="block text-gray-300 text-sm font-semibold mb-2">
              Konfirmasi Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model="formData.confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                required 
                class="w-full bg-gray-900 text-white pl-4 pr-12 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500" 
                placeholder="Ulangi password di atas"
              >
              <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none transition-colors">
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.71-1.583c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.564 3.029m-5.858-.908a3 3 0 00-4.243-4.243m4.243 4.243L8 8" /></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
            </div>
            <!-- Pesan Peringatan Jika Tidak Cocok -->
            <p v-if="formData.confirmPassword && formData.password !== formData.confirmPassword" class="text-red-400 text-xs font-semibold mt-1">
              * Password tidak cocok!
            </p>
          </div>

          <div>
            <label class="block text-gray-300 text-sm font-semibold mb-2">Role <span class="text-red-500">*</span></label>
            <select v-model="formData.role" required class="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500">
              <option value="user">User Biasa</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
              <option value="dev">Developer</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">Batal</button>
            <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center disabled:opacity-50">
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Data' }}
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const users = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)

// State untuk Modal
const isModalOpen = ref(false)
const isEditMode = ref(false)
const selectedUserId = ref(null)

// State untuk memunculkan/menyembunyikan password
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '', // Field baru untuk konfirmasi
  role: 'user'
})

// Ambil Token dan Role dari session Storage
const token = sessionStorage.getItem('token')
const currentRole = sessionStorage.getItem('role')

// URL Backend (diambil dari .env Vue)
const API_URL = import.meta.env.VITE_API_BASE_URL

// Header Konfigurasi JWT Axios
const getHeaders = () => ({
  headers: { Authorization: `Bearer ${token}` }
})

// ==========================================
// 1. OTENTIKASI HALAMAN SAAT DIMUAT
// ==========================================
onMounted(() => {
  if (!token || (currentRole !== 'admin' && currentRole !== 'dev')) {
    alert('Akses Ditolak! Halaman ini khusus untuk Administrator dan Developer.')
    router.push('/') 
    return
  }
  
  fetchUsers()
})

// ==========================================
// 2. FUNGSI CRUD MENGGUNAKAN AXIOS
// ==========================================
const fetchUsers = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`${API_URL}/api/account/users`, getHeaders())
    users.value = response.data
  } catch (error) {
    console.error(error)
    alert('Gagal memuat data pengguna.')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  // Validasi tambahan: Pastikan konfirmasi password cocok
  if (formData.value.password && formData.value.password !== formData.value.confirmPassword) {
    alert('Password dan Konfirmasi Password tidak cocok!');
    return;
  }

  isSubmitting.value = true
  try {
    // Siapkan data untuk dikirim ke backend (tanpa menyertakan confirmPassword)
    const payload = {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.role
    }

    if (isEditMode.value) {
      await axios.put(`${API_URL}/api/account/edit/${selectedUserId.value}`, payload, getHeaders())
      alert('Data pengguna berhasil diperbarui!')
    } else {
      await axios.post(`${API_URL}/api/account/register`, payload, getHeaders())
      alert('Pengguna baru berhasil didaftarkan!')
    }
    
    closeModal()
    fetchUsers() // Refresh tabel
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || 'Terjadi kesalahan pada server.')
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id, username) => {
  if (confirm(`PERINGATAN!\nApakah Anda yakin ingin menghapus akses akun '${username}' secara permanen?`)) {
    try {
      await axios.delete(`${API_URL}/api/account/delete/${id}`, getHeaders())
      alert('Akun berhasil dihapus.')
      fetchUsers()
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Gagal menghapus akun.')
    }
  }
}

// ==========================================
// 3. KONTROL MODAL & FORMATTING
// ==========================================
const openAddModal = () => {
  isEditMode.value = false
  selectedUserId.value = null
  formData.value = { username: '', email: '', password: '', confirmPassword: '', role: 'user' }
  showPassword.value = false
  showConfirmPassword.value = false
  isModalOpen.value = true
}

const openEditModal = (user) => {
  isEditMode.value = true
  selectedUserId.value = user.id
  formData.value = { 
    username: user.username, 
    email: user.email, 
    password: '', 
    confirmPassword: '', 
    role: user.role 
  }
  showPassword.value = false
  showConfirmPassword.value = false
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const getRoleBadgeColor = (role) => {
  if (role === 'dev') return 'bg-cyan-900/50 text-cyan-300 border border-cyan-700'
  if (role === 'admin') return 'bg-red-900/50 text-red-300 border border-red-700'
  if (role === 'operator') return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
  if (role === 'user') return 'bg-green-900/50 text-green-300 border border-green-700'
  return 'bg-blue-900/50 text-blue-300 border border-blue-700'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr 
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
</script>