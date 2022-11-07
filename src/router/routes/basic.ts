import { LAYOUT } from '../constant'
import type { AppRouteRecordRaw } from '../types'
export const TEST_ROUTER: AppRouteRecordRaw = {
  name: 'TestRouter',
  meta: {
    title: '测试路由',
  },
  path: '/dashboard',
  components: LAYOUT,
}

