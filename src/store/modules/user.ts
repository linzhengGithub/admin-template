import { defineStore } from 'pinia'
import { removeToken } from '@/utils/auth'
import { loginApi } from '@/api/user'

interface UserState {
  username: string
  password: string
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
      const result = await loginApi(params)
      console.log('await拿到数据', result)

      // const { data, code } = result.data
      // if (code === 200) {
      //   this.username = data.username
      //   this.token = data.token
      // }
      // return data
    },
    // 登出
    logout() {
      removeToken()
    },
  },
})

