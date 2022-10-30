import axios from 'axios'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/auth'

interface UserState {
  username: String
  password: String
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    username: '',
    token: '',
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    // 登录
    async login(params: UserState) {
      const result = await axios.post('/basic-api/login', params)
      const { data, code } = result.data
      if (code === 200) {
        this.username = data.username
        this.token = data.token
      }
      return data
    },
    // 登出
    logout() {
      removeToken()
    },
  },
})

