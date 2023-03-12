import Roles from '../views/Roles.vue'

export default [
  {
    name: 'Roles',
    path: '/roles',
    component: Roles,
    meta: {
      protected: true,
    },
  },
]
