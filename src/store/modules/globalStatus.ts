import { defineStore } from 'pinia'

interface GlobalStatusState {
  isCollapse: boolean
}

export const useGlobalStatus = defineStore({
  id: 'global-status',
  state: (): GlobalStatusState => {
    return {
      isCollapse: false,
    }
  },
  getters: {
    getIsCollapse(): boolean {
      return this.isCollapse
    },
  },
  actions: {
    setIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
})
