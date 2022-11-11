import { PAGE_NOT_FOUND } from '../constant'
import type { AppRouteRecordRaw } from '../types'
import { PageEnum } from '@/enums/pageEnum'

export const ERROR_PAGE: AppRouteRecordRaw = {
  path: '/error-page',
  name: 'ErrorPage',
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: PageEnum.NOT_FOUND,
      name: PAGE_NOT_FOUND,
      component: () => import('@/views/system/errorPage/NotFound.vue'),
      meta: {
        title: PAGE_NOT_FOUND,
      },
    },
  ],
}

