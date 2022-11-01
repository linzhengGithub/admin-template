import { defHttp } from '@/utils/axios'

enum Api {
  Login = '/login',
}

interface LoginParams {
  username: string
  password: string
}

export function loginApi(params: LoginParams) {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
  )
}
