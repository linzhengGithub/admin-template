import type { RouteRecordRaw, Router } from 'vue-router'
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

const addRoutes = async (router, permissionStore) => {
  const routes = await permissionStore.buildRoutesAction()

  routes.forEach((route) => {
    router.addRoute(route as unknown as RouteRecordRaw)
  })
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
      if (permissionStore.getIsDynamicAddedRoute) {
        next()
        return
      }

      await addRoutes(router, permissionStore)
      permissionStore.setDynamicAddedRoute(true)

      next({ ...to, replace: true })
    }
    else {
      if (WHITE_PATH_LIST.includes(to.path as PageEnum))
        next()
      else
        next(redirectLogin)
    }
  })
}
