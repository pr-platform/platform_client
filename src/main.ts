import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
  },
})
app.use(router)
app.use(pinia)
app.use(VueAxios, axios)

app.config.globalProperties.$axios = axios

app.mount('#app')
