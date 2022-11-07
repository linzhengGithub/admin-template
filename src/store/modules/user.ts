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
interface UserInfo {
  userId: string
  username: string
  roles?: []
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getToken(): string {
      return this.token || ''
    },
    getUserInfo(): UserInfo {
      return this.userInfo
    },
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
    },
    // 登录
    async login(params: LoginParams) {
      const result: any = await loginApi(params)
      const { token } = result
      this.token = token
      setToken(token)
      return this.afterLoginAction()
    },
    async afterLoginAction() {
      if (!this.getToken)
        return null
      const userInfo = this.getUserInfoAction()
      return userInfo
    },
    // 获取用户信息
    async getUserInfoAction() {
      const token = this.getToken
      if (!token)
        return null
      const userInfo = await getUserInfoApi({ token })
      this.setUserInfo(userInfo)
      return userInfo
    },
    // 登出
    logout() {
      removeToken()
    },
  },
})

