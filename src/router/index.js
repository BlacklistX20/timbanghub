import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ScaleDetailView from '../views/ScaleDetailView.vue'
import DataTableView from '../views/DataTableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } // Membutuhkan login
    },
    {
      path: '/timbangan/:id',
      name: 'scale-detail',
      component: ScaleDetailView,
      props: true,
      meta: { requiresAuth: true } // Membutuhkan login
    },
    {
      path: '/data',
      name: 'data-table',
      component: DataTableView,
      meta: { requiresAuth: true } // Membutuhkan login
    }
  ]
})

// Route Guard Logika
router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jika halaman butuh login dan user belum login, lempar ke halaman login
    return { name: 'login' }
  } 
  
  if (to.name === 'login' && isAuthenticated) {
    // Jika user sudah login tapi mencoba buka halaman login lagi, arahkan ke dashboard
    return { name: 'dashboard' }
  }

  // Izinkan akses jika memenuhi syarat
  return true
})

export default router