import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from './store'

const app = createApp(App)
app.use(pinia).use(ElementPlus).mount('#app')
