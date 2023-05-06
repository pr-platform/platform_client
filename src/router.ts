import { createRouter, createWebHistory, useRouter } from 'vue-router'
import Home from './views/Home.vue'
import Info from './views/Info.vue'
import authRoutes from './modules/auth/routes'
import userRoutes from './modules/user/routes'
import mailRoutes from './modules/mail/routes'
import langRoutes from './modules/lang/routes'
import roleRoutes from './modules/role/routes'

import { useUserStore } from './modules/user/store'
import userService from './modules/user/services'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      protected: true,
    },
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
  ...roleRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const permissionGuard = (to, next) => {
  const permissions = useUserStore().profile.role?.permissions?.map(permission => permission.alias)
  const routePermissions = to.meta?.permissions

  if (routePermissions) {
    if (permissions.includes(...(routePermissions as string[]))) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta?.protected) {
    if (useUserStore().profile) {
      permissionGuard(to, next)
    } else {
      const access_token = localStorage.getItem('access_token')

      if (access_token) {
        try {
          const profile = await userService.getProfile({
            include_permissions: true,
          })

          useUserStore().profile = profile
          permissionGuard(to, next)
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
