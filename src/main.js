// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.use(createPinia())
app.mount('#app')
