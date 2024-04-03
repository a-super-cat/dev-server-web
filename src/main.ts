import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import router from './router'
const pinia = createPinia()
import en from '@/i18n/en'
import zh from '@/i18n/zh'

pinia.use(piniaPluginPersistedstate)

const envLanguage = Intl.DateTimeFormat().resolvedOptions().locale
const language = envLanguage.includes('zh') ? 'zh' : 'en'

const app = createApp(App)
const i18n = createI18n<false>({
  legacy: false,
  locale: language,
  messages: {
    en,
    zh,
  }
})

app.use(router)
app.use(i18n)
app.use(pinia)

app.component("SvgIcon", SvgIcon);

app.mount('#app')

