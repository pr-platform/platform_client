import SendMail from '../views/SendMail.vue'

export default [
  {
    name: 'SendMail',
    path: '/send-mail',
    component: SendMail,
    meta: {
      protected: true,
    },
  },
]
