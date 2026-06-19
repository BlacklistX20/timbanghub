<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans flex">
    <Sidebar v-if="!isLoginRoute" />
    
    <main :class="['flex-1 w-full overflow-x-hidden transition-all duration-300', !isLoginRoute ? 'p-4 md:p-8 md:ml-20 mt-16 md:mt-0' : '']">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const isLoginRoute = computed(() => route.name === 'login')
</script>