import { LAYOUT, PAGE_NOT_FOUND } from '../constant'
import type { AppRouteRecordRaw } from '../types'

export const ERROR_PAGE: AppRouteRecordRaw = {
  path: '/error-page',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/error-page/notFound',
      name: PAGE_NOT_FOUND,
      component: () => import('@/views/system/errorPage/NotFound.vue'),
      meta: {
        title: 'NotFound',
      },
    },
  ],
}

