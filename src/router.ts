import { createRouter, createWebHistory, useRouter } from 'vue-router'
import Home from './views/Home.vue'
import Info from './views/Info.vue'
import authRoutes from './modules/auth/routes'
import userRoutes from './modules/user/routes'
import mailRoutes from './modules/mail/routes'
import langRoutes from './modules/lang/routes'

import { useUserStore } from '@/modules/user/store'
import userService from '@/modules/user/services'

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
  ...userRoutes,
  ...mailRoutes,
  ...langRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.protected) {
    if (useUserStore().profile) {
      next()
    } else {
      const access_token = localStorage.getItem('access_token')

      if (access_token) {
        try {
          const profile = await userService.getProfile()

          useUserStore().profile = profile
          next()
        } catch (error) {
          next({ name: 'SignIn' })
        }
      }

      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
