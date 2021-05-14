import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { setupRouter } from './router'
import store from './store'
import { setupI18n } from './lang'
import en from './lang/modules/en'
import './index.css'
import 'element-plus/lib/theme-chalk/index.css'

const i18n = setupI18n({
    legacy: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en
    }
})

const router = setupRouter(i18n)

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus, {
    i18n: i18n.global.t
})
app.use(store)
app.mount('#app')
