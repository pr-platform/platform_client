import Profile from '../views/Profile.vue'

export default [
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    meta: {
      protected: true,
    },
  },
]
