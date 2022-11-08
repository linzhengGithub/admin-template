import { LAYOUT } from '@/router/constant'
import type { AppRouteRecordRaw } from '@/router/types'

export const TEST_ROUTER: AppRouteRecordRaw = {
  name: 'TestRouter',
  meta: {
    title: '测试路由',
  },
  path: '/dashboard',
  component: LAYOUT,
  children: [
    {
      path: '/dashboard/listOne',
      name: 'listOne',
      component: () => import('@/views/testRouter/list/listOne.vue'),
      meta: {
        title: 'listOne',
      },
    }, {
      path: '/dashboard/listTwo',
      name: 'listTwo',
      component: () => import('@/views/testRouter/list/listTwo.vue'),
      meta: {
        title: 'listTwo',
      },
    },
  ],
}
