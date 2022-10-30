import { resultSuccess } from '../_util'

export default [
  {
    url: '/basic-api/login',
    method: 'post',
    response: () => {
      return resultSuccess({
        token: 'basic_token',
        username: 'basic_name',
      })
    },
  },
]
