import type { AppRouteModule, AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'

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
  component: () => import('@/views/system/Login.vue'),
  meta: {
    title: 'login',
  },
}

export const basicRoutes = [
  LoginRoute,
  RootRoute,
]
