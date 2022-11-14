import { defineStore } from 'pinia'
import { store } from '@/store/index'
import { getTokenToCookie, removeCookieToken, setTokenToCookie } from '@/utils/auth'
import { getUserInfoApi, loginApi } from '@/api/user'
import { router } from '@/router'

interface UserState {
  userInfo: any
  token?: string
  lastUpdateTime: number
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
    lastUpdateTime: 0,
  }),
  getters: {
    getToken(): string {
      return this.token || ''
    },
    getUserInfo(): UserInfo {
      return this.userInfo
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setToken(token: string) {
      this.token = token
      setTokenToCookie(token)
    },
    // 登录
    async login(params: LoginParams) {
      const data: any = await loginApi(params)
      const { result, code } = data
      if (code === 200)
        this.setToken(result.token)
      return this.afterLoginAction()
    },
    async afterLoginAction() {
      if (!this.getToken)
        return null
      const userInfo = await this.getUserInfoAction()
      router.replace('/')
      return userInfo
    },
    // 获取用户信息
    async getUserInfoAction() {
      const cookieToken = getTokenToCookie()
      if (!cookieToken)
        return null
      this.setToken(cookieToken)
      const userInfo = await getUserInfoApi({ token: cookieToken })
      this.setUserInfo(userInfo)
      return userInfo
    },
    // 登出
    logout() {
      removeCookieToken()
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}

