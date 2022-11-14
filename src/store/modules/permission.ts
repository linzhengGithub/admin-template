import { defineStore } from 'pinia'
import type { AppRouteRecordRaw } from '@/router/types'
import { store } from '@/store'
import { TEST_ROUTER } from '@/router/routes/modules/testRouter'

interface PermissionState {
  backMenuList: []
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
    getBackMenuList(): [] {
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
    setBackMenuList(list: []) {
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
      routes.push(TEST_ROUTER)
      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
