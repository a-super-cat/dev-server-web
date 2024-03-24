import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { menuItems } from '@/utils/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.APP_BASE_URL),
  routes: menuItems as RouteRecordRaw[],
})

export default router
