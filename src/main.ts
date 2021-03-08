import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import { i18n } from './lang'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(i18n)
app.mount('#app')
