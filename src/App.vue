<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans flex">
    <Sidebar v-if="!isLoginRoute" />
    
    <main :class="['flex-1 p-8', !isLoginRoute ? 'ml-20' : '']">
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