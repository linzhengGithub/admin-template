import { defineStore } from 'pinia'
import { store } from '@/store'

interface PermissionState {
  backMenuList: []
  lastBuildMenuTime: number
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    lastBuildMenuTime: 0,
    backMenuList: [],
  }),
  getters: {
    getBackMenuList(): [] {
      return this.backMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
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
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
