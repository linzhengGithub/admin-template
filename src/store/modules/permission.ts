import { defineStore } from 'pinia'
import { store } from '@/store'

interface PermissionState {
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({}),
  getters: {},
  actions: {},
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
