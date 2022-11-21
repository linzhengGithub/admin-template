import { createApp } from 'vue'
import './styles/index.scss'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import App from './App.vue'
import { setupRouterGuard } from './router/guard'
import { setupStore } from '@/store/index'
import { router, setupRouter } from '@/router/index'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
