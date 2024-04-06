<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { menuItems } from '@/utils/constants'
import Setting from '@/components/SettingConf.vue'
import router from './router';
import type { MenuItem } from '@/types/common'
import { setPageSetting, getPageSetting } from '@/api/system'
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { getRequestFormConf } from '@/utils/tools'
import { useGlobalStore } from './store';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.js'
// @ts-ignore
import en from 'element-plus/dist/locale/en.js'

const { t } = useI18n();

const store = useGlobalStore();

const isShow = ref<boolean>(false);
const lang = Intl.DateTimeFormat().resolvedOptions().locale;
const locale = lang.toLocaleLowerCase().includes('zh') ? zhCn : en;


// mock页面的配置数据
const mockConf = ref({
  username: '',
  password: '',
  token: '',
  apiPath: '',
  authType: 'header',
  method: 'POST',
  passwordEncryptType: 'MD5',
  salt: '',
  conf: `{
  "auth": {
    "Authorization": "Bearer \${token}",
  },
  "logInfoMap": {
    "username": "username",
    "password": "password",
  },
  "token": "data.token",
}`,
  authKey: 'Authorization',
  authValuePartten: 'Bearer ${token}',
});


const handleMenuItemClick = (menuItem: MenuItem) => {
  const { path } = menuItem;
  router.push(path)
}

const handleLogin = async () => {
  const info =  mockConf.value;
  await handleSaveSetting(true);
  const loginFunc = getRequestFormConf({
    passwordEncryptType: info.passwordEncryptType,
    salt: info.salt,
    api: info.apiPath,
    conf: info.conf,
    method: info.method,
    authType: info.authType,
  }, true);
  const res = await loginFunc({
    username: info.username,
    password: info.password,
  });
  if(res.code === 200) {
    ElMessage.success(`${t('global.login')}:${t('global.success')}`);
  } else {
    ElMessage.error(`${t('global.login')}:${t('global.failed')}`);
  }
}

// 保存配置 如果有token的话，保存的效果就等同登录了
const handleSaveSetting = async (isLogin: boolean = false) => {
  try {
    const res = await setPageSetting(mockConf.value);

    if(isLogin !== true) {
      if(res.code === 200) {
        ElMessage.success(`${t('global.save')}:${t('global.success')}`);
        return true;
      } else {
        ElMessage.error(`${t('global.save')}:${t('global.failed')}`);
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}

const handleGetSetting = async () => {
  try {
    const res = await getPageSetting();
    if(res.code === 200) {
      const { data } = res;
      if(Object.keys(data ?? {}).length) {
        mockConf.value = data;
        store.setSetting(data);
      }
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(handleGetSetting);
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
            {{ t('global.systemSetting') }}
          </div>
        </div>
      </div>
      <div class="ml-36 min-h-[600px] h-screen bg-gray-100">
        <RouterView />
      </div>
    </div>
    <el-dialog v-model="isShow" :title="t('global.systemSetting')" width="960px">
      <Setting v-model="mockConf" setting-for="mock" @login="handleLogin" @save="handleSaveSetting" />
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

