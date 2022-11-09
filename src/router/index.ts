import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

// 白名单
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) => {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
  })
}
getRouteNames(basicRoutes)

// https://router.vuejs.org/zh/api/index.html#createrouter
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app) {
  app.use(router)
}
