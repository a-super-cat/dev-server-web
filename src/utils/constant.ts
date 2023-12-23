import type { MenuItem } from '@/types/common.d.ts'

export const menuItems: MenuItem[] = [
  {
    path: '/',
    name: '数据模拟',
    icon: 'icon-wangyuanjing',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/request',
    name: '接口请求',
    icon: 'icon-huiduceshi',
    component: () => import('@/views/ApiRequest.vue'),
  },
  {
    path: '/apiTest',
    name: '接口测试',
    icon: 'icon-a-5',
    component: () => import('@/views/ApiTest.vue'),
  }
]