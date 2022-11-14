import { ERROR_PAGE } from '@/router/routes/basic'
import type { AppRouteModule, AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
import { TEST_ROUTER } from '@/router/routes/modules/testRouter'

const localRouter = [TEST_ROUTER]

const routeModuleList: AppRouteModule[] = []

localRouter.forEach((key) => {
  routeModuleList.push(key)
})

export const asyncRoutes = [ERROR_PAGE, ...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/system/login/Login.vue'),
  meta: {
    title: 'login',
  },
}

export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ERROR_PAGE,
]
