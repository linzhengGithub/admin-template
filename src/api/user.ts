import { defHttp } from '@/utils/axios'

enum Api {
  Login = '/logins',
  GerUserInfo = '/getUserInfo',
}

interface LoginParams {
  username: string
  password: string
}

interface UserInfoParams {
  token: string
}

export function loginApi(params: LoginParams) {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
  )
}

export function getUserInfoApi(params: UserInfoParams) {
  return defHttp.get(
    {
      url: Api.GerUserInfo,
      params,
    },
  )
}
