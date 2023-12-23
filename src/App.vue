<script setup lang="ts">
import { RouterView } from 'vue-router'
import { menuItems } from '@/utils/constant'
import router from './router';
import type { MenuItem } from '@/types/common'


const handleMenuItemClick = (menuItem: MenuItem) => {
  const { path } = menuItem;
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen relative">
    <div class="h-screen w-40 bg-blue-500 fixed left-0 top-0 min-h-[600px] flex-col items-center gap-6 box-border pt-4">
      <div class="flex w-full flex-col gap-4 items-center">
        <div 
          :class="`flex w-full flex-1 flex-col gap-2 p-2 cursor-pointer items-center text-gray-200 ${router.currentRoute.value.path === item.path ? 'bg-blue-400' : ''}  hover:bg-blue-400`" 
          v-for="item in menuItems" 
          :key="item.name"
          @click="handleMenuItemClick(item)"
        >
          <span :class="`iconfont text-4xl ${item.icon}`" />
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="ml-44 min-h-[600px] h-screen">
      <RouterView />
    </div>
  </div>
</template>

