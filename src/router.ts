import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Info from './views/Info.vue'
import { routes as authRoutes } from './modules/auth'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Info',
    path: '/info',
    component: Info,
  },
  ...authRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
