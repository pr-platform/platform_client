import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Verified from '../views/Verified.vue'
import RegistrationInfo from '../views/RegistrationInfo.vue'
import ResetPassword from '../views/ResetPassword.vue'

export default [
  {
    name: 'SignIn',
    path: '/signin',
    component: SignIn,
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignUp,
  },
  {
    name: 'Verified',
    path: '/verified',
    component: Verified,
  },
  {
    name: 'RegistrationInfo',
    path: '/registration-info',
    component: RegistrationInfo,
  },
  {
    name: 'ResetPassword',
    path: '/reset-password',
    component: ResetPassword,
  },
]
