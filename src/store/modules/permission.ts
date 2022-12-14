import { defineStore } from 'pinia'
import type { AppRouteRecordRaw, Menu } from '@/router/types'
import { store } from '@/store'
import { TEST_ROUTER } from '@/router/routes/modules/testRouter'
import { TEST } from '@/router/routes/modules/test'

interface PermissionState {
  backMenuList: Menu[]
  lastBuildMenuTime: number
  isDynamicAddedRoute: boolean
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    lastBuildMenuTime: 0,
    backMenuList: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async buildRoutesAction() {
      const routes: AppRouteRecordRaw[] = []
      const routeList: AppRouteRecordRaw[] = [TEST_ROUTER, TEST]
      routeList.forEach((i) => {
        routes.push(i)
      })
      this.setBackMenuList(routes)
      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
