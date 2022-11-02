import { defineStore } from 'pinia'
import { removeToken, setToken } from '@/utils/auth'
import { getUserInfoApi, loginApi } from '@/api/user'

interface UserState {
  userInfo: any
  token?: string
}
interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: '',
  }),
  getters: {
    getToken(): any {
      return this.token
    },
  },
  actions: {
    // 登录
    async login(params: LoginParams) {
      const result: any = await loginApi(params)
      const { token } = result
      this.token = token
      setToken(token)
      return this.getUserInfo()
    },
    // 获取用户信息
    async getUserInfo() {
      const token = this.getToken
      if (!token)
        return null
      const userInfo = await getUserInfoApi({ token })
      this.userInfo = userInfo
    },
    // 登出
    logout() {
      removeToken()
    },
  },
})

