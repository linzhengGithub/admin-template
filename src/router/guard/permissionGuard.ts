import type { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { LoginRoute, RootRoute } from '@/router/routes'
import { PageEnum } from '@/enums/pageEnum'
import { getTokenToCookie } from '@/utils/auth'

const ROOT_PATH = RootRoute.path
const LOGIN_PATH = PageEnum.BASE_LOGIN
const whitePathList: PageEnum[] = [LOGIN_PATH]
const redirectLogin = {
  path: LOGIN_PATH,
  replace: true,
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('to---->', to)
    console.log('from---->', from)
    const userStore = useUserStoreWithOut()
    const token = getTokenToCookie()
    // token -> next()
    // !token -> login page

    if (token && to.path !== LOGIN_PATH) {
      next()
      return
    }

    //
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        // const isSessionTimeout = userStore.getSessionTimeout;
        await userStore.afterLoginAction()
        next((to.query?.redirect as string) || '/')
        try {
          // await userStore.afterLoginAction()
          // if (!isSessionTimeout) {
          // next((to.query?.redirect as string) || '/')
          // return
          // }
        }
        catch {}
      }
      next()
    }

    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      }
      catch (err) {
        next()
      }
    }

    if (!token)
      next(redirectLogin)
  })
}
