import type { MenuItem } from '@/types/common.d.ts'
const envLanguage = Intl.DateTimeFormat().resolvedOptions().locale

// 菜单项
export const menuItems: MenuItem[] = [
  {
    path: '/',
    name: envLanguage.includes('zh') ? '数据模拟' : 'Mock',
    icon: 'mock',
    component: () => import('@/views/HomeView.vue'),
  },
];

// 处理请求的方式
export const mockPatternList = ['mock', 'request', 'request&create', 'mockJs'] as const;

// 接口请求方式
export const requestMethodList = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

// 接口类型
export const apiTypeList = ['HTTP', 'JSON-RPC'] as const;

export const wsMessageTypeList = ['param', 'refresh:mockList'] as const;
