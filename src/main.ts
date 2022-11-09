import { createApp } from 'vue'
import './style.css'
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
