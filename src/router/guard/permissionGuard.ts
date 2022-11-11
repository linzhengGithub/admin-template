import type { RouteRecordRaw, Router } from 'vue-router'
import { TEST_ROUTER } from '../routes/modules/testRouter'
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/pageEnum'
import { getTokenToCookie } from '@/utils/auth'
import { WHITE_PATH_LIST } from '@/router/index'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const redirectLogin = {
  path: LOGIN_PATH,
  replace: true,
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStoreWithOut()
    const permissionStore = usePermissionStoreWithOut()
    const token = getTokenToCookie()

    if (userStore.getLastUpdateTime === 0 && token) {
      try {
        await userStore.getUserInfoAction()
      }
      catch (err) {
        next()
        return
      }
    }

    if (token) {
      if (to.path === LOGIN_PATH) {
        // 路由权限
        next('/')
      }
    }
    else {
      if (WHITE_PATH_LIST.includes(to.path as PageEnum))
        next()
      else
        next(redirectLogin)
    }
  })
}
