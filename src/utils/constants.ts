import type { MenuItem } from '@/types/common.d.ts'
import docIcon from '@/assets/pngIcons/doc.png';
import fileIcon from '@/assets/pngIcons/file.png';
import imageIcon from '@/assets/pngIcons/image.png';
import mp3Icon from '@/assets/pngIcons/mp3.png';
import pdfIcon from '@/assets/pngIcons/pdf.png';
import pptIcon from '@/assets/pngIcons/ppt.png';
import textIcon from '@/assets/pngIcons/txt.png';
import videoIcon from '@/assets/pngIcons/video.png';
import xlsIcon from '@/assets/pngIcons/xls.png';
import zipIcon from '@/assets/pngIcons/zip.png';

// 菜单项
export const menuItems: MenuItem[] = [
  {
    path: '/',
    name: '数据模拟',
    icon: 'mock',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/assetsManage',
    name: '静态资源',
    icon: 'assetsManagement',
    component: () => import('@/views/AssetsManage.vue'),
  },
];

// 处理请求的方式
export const mockPatternList = ['mock', 'request', 'request&create', 'mockJs'] as const;

// 接口请求方式
export const requestMethodList = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

// 接口类型
export const apiTypeList = ['HTTP', 'JSON-RPC'] as const;

export const wsMessageTypeList = ['param', 'refresh:mockList'] as const;

export {
  docIcon,
  fileIcon,
  imageIcon,
  mp3Icon,
  pdfIcon,
  pptIcon,
  textIcon,
  videoIcon,
  xlsIcon,
  zipIcon,
}