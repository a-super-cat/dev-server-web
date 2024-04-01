<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { menuItems } from '@/utils/constants'
import Setting from '@/components/SettingConf.vue'
import router from './router';
import type { MenuItem } from '@/types/common'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.js'
// @ts-ignore
import en from 'element-plus/dist/locale/en.js'

const needSettingPages = ['mock', 'assets'];

const isShow = ref<boolean>(false);
const settingFor = ref<string>('mock');
const lang = Intl.DateTimeFormat().resolvedOptions().locale;
const locale = lang.toLocaleLowerCase().includes('zh') ? zhCn : en;


// mock页面的配置数据
const mockConf = ref({
  usernameKey: 'username',
  passwordKey: 'password',
  username: '',
  password: '',
  token: '',
  apiPath: '',
  authType: 'header',
  method: 'POST',
  conf: `{
  "auth": {
    "Authorization": "Bearer \${token}",
  },
  "logInfoMap": {
    "username": "username",
    "password": "password",
  },
  "res": {
    "token": "data.token",
  }
}`,
  authKey: 'Authorization',
  authValuePartten: 'Bearer ${token}',
});

// 静态资源页面的配置数据
const assetsConf = ref({
  username: '',
  password: '',
  token: '',
  authType: 'header',
  method: 'POST',
  conf: `{
  "auth": {
    "Authorization": "Bearer \${token}",
  },
  "logInfoMap": {
    "username": "username",
    "password": "password",
  },
  "res": {
    "token": "data.token",
  }
}`,
  list: {
    url: '',
    method: 'POST',
    conf: `{
  "req": {
    "map": {
      "current": "current",
      "size": "size",
    }
  },
  "res": {
    "map": {
      "total": "total",
    },
    "itemMap": {
      "url": "imgUrl",
      "time": "date",
      "name": "name",
      "extension": "extension"
    }
  }
}`,
  },
  upload: {
    url: '',
    method: 'POST',
    conf: `{
  "res": {
    "map": {
      "id": "id",
      "url": "data",
      "name": "name",
      "extension": "extension",
      "time": "date",
    }
  }
}`,
  },
  delete: {
    url: '',
    method: 'GET',
    conf: `{
  "res": {
    "result": "data"
  }
}`,
  },
  update: {
    url: '',
    method: 'POST',
    conf: `{
  "res": {
    "result": "data"
  }
}`,
  }
});

const handleMenuItemClick = (menuItem: MenuItem) => {
  const { path } = menuItem;
  router.push(path)
}

const handleSetMockDataSetting = () => {
  console.log(mockConf.value)
}
const handleLogin = () => {
  if(settingFor.value === 'mock') {
    console.log('mock', mockConf.value)
  } else {
    console.log('assets', assetsConf.value)
  }
}
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="min-h-screen relative">
      <div class="h-screen w-36 bg-blue-500 fixed left-0 top-0 min-h-[600px] flex-col items-center gap-6 box-border pt-4 shadow-xl shadow-blue-900  translate-x-0 menu-area">
        <div class="flex relative w-full flex-col gap-4 items-center">
          <div 
            :class="`flex w-full flex-1 flex-col gap-2 p-2 cursor-pointer items-center text-gray-200 ${router.currentRoute.value.path === item.path ? 'bg-blue-400' : ''}  hover:bg-blue-400`" 
            v-for="item in menuItems" 
            :key="item.name"
            @click="handleMenuItemClick(item)"
          >
            <SvgIcon class="text-gray-200" :icon-name="item.icon" />
            {{ item.name }}
          </div>

          <div
            class="fixed bottom-4 flex w-full flex-1 flex-col gap-2 p-2 cursor-pointer items-center text-gray-200 hover:bg-blue-400"
            @click="isShow = true"
          >
            <SvgIcon class="text-gray-200 scale-125" icon-name="setting" />
            设置
          </div>
        </div>
      </div>
      <div class="ml-36 min-h-[600px] h-screen bg-gray-100">
        <RouterView />
      </div>
    </div>
    <el-dialog v-model="isShow" title="系统配置" width="960px">
      <div class="flex max-h-[60vh]">
        <div v-for="item in needSettingPages" :key="item" 
          :class="{'flex-1 box-border text-center cursor-pointer p-2': true, 'border': item !== settingFor, 'bg-primary-light text-white': item===settingFor}"
          @click="settingFor = item"
        >
          {{ item }} Setting
        </div>
      </div>
      <Setting v-if="settingFor === 'mock'" v-model="mockConf" setting-for="mock" @login="handleLogin" />
      <Setting v-else setting-for="assets" v-model="assetsConf" @login="handleLogin" />
    </el-dialog>
  </el-config-provider>
</template>

<style lang="scss">
.menu-area {
  .el-form-item__content {
    display: flex !important;
    gap: 8px !important;
    input {
      width: unset !important;
    }
  }
}

.el-overlay-dialog {
  &::webkit-scrollbar {
    display: none;
  }
}
</style>

