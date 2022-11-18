import { LAYOUT } from '@/router/constant'
import type { AppRouteRecordRaw } from '@/router/types'

export const TEST: AppRouteRecordRaw = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  meta: {
    title: '测试路由',
    icon: 'testSearch',
  },
  redirect: '/test/listOne',
  children: [
    {
      path: '/test/listOne',
      name: 'One',
      component: () => import('@/views/test/listOne.vue'),
      meta: {
        title: 'One',
      },
    }, {
      path: '/test/listTwo',
      name: 'Two',
      component: () => import('@/views/test/listTwo.vue'),
      meta: {
        title: 'Two',
      },
    },
  ],
}
