import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ja'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPersistedState())

app.use(pinia)
app.use(router)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
  })
  
app.mount('#app')