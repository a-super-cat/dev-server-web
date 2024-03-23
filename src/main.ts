import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import router from './router'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

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

app.use(createPinia())
app.use(router)
app.use(i18n)

app.component("SvgIcon", SvgIcon);

app.mount('#app')

