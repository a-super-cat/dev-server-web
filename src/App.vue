<script setup lang="ts">
import { RouterView } from 'vue-router'
import { menuItems } from '@/utils/constants'
import router from './router';
import type { MenuItem } from '@/types/common'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.js'
// @ts-ignore
import en from 'element-plus/dist/locale/en.js'


const handleMenuItemClick = (menuItem: MenuItem) => {
  const { path } = menuItem;
  router.push(path)
}
const lang = Intl.DateTimeFormat().resolvedOptions().locale
const locale = lang.toLocaleLowerCase().includes('zh') ? zhCn : en
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="min-h-screen relative">
      <div class="h-screen w-36 bg-blue-500 fixed left-0 top-0 min-h-[600px] flex-col items-center gap-6 box-border pt-4 shadow-xl shadow-blue-900">
        <div class="flex w-full flex-col gap-4 items-center">
          <div 
            :class="`flex w-full flex-1 flex-col gap-2 p-2 cursor-pointer items-center text-gray-200 ${router.currentRoute.value.path === item.path ? 'bg-blue-400' : ''}  hover:bg-blue-400`" 
            v-for="item in menuItems" 
            :key="item.name"
            @click="handleMenuItemClick(item)"
          >
          <SvgIcon class="text-gray-200" :icon-name="item.icon" />
            <!-- <span :class="`iconfont text-4xl ${item.icon}`" /> -->
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="ml-36 min-h-[600px] h-screen bg-gray-100">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

