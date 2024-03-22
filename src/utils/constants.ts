import type { MenuItem } from '@/types/common.d.ts'

// 菜单项
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
];

// 处理请求的方式
export const mockPatternList = ['mock', 'request', 'mockJs'] as const;

// 接口请求方式
export const requestMethodList = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

// 接口类型
export const apiTypeList = ['HTTP', 'JSON-RPC'] as const;

export const wsMessageTypeList = ['param'] as const;