import { LAYOUT, PAGE_NOT_FOUND_NAME } from '../constant'
import type { AppRouteRecordRaw } from '../types'

export const ERROR_PAGE: AppRouteRecordRaw = {
  name: 'ErrorPage',
  meta: {
    title: 'ErrorPage',
  },
  path: '/:path(.*)*',
  component: LAYOUT,
  children: [],
}

