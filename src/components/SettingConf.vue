<template >
  <div>
      <el-form label-width="72px" class="pt-6 px-4">
        <div class="grid grid-cols-2">
          <el-form-item label="用户名">
            <el-input v-model="confData.username" />
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="confData.password" />
          </el-form-item>

          <div class="col-span-2">
            <el-form-item label="登录地址">
              <div class="flex w-full">
                <el-input class="flex-1" v-model="confData.loginPath">
                  <template #append>
                    <div class="flex items-center relative gap-10 w-60">
                      <el-select
                        v-model="confData.method"
                        style="flex: 1;"
                        placeholder="Method"
                      >
                        <el-option 
                          v-for="item in requestMethodList" 
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>

                      <el-select
                        v-model="confData.authType"
                        placeholder="Select"
                        style="flex: 1;"
                      >
                        <el-option key="header" :label="'header'" :value="'header'" />
                        <el-option key="query" :label="'query'" :value="'query'" />
                      </el-select>
                    </div>
                  </template>
                </el-input>
              </div>
            </el-form-item>
          </div>
        </div>

        
        <el-form-item label="授权设置">
          <RequestResponseConf v-model="confData.conf" />
        </el-form-item>

        <el-form-item label="token">
          <div class="flex w-full">
            <el-input class="flex-1" type="textarea" v-model="confData.token" />
          </div>
        </el-form-item>
        <el-form-item >
          <div class="flex flex-row-reverse w-full">
            <el-button type="primary" @click="$emit('login', confData)">保存并登录</el-button>
          </div>
        </el-form-item>

        <div class="grid grid-cols-2 box-border gap-4" v-if="settingFor === 'assets'">
          
          <div class="bg-blue-50 p-4 box-border rounded-md" v-for="apiItem in apiList" :key="apiItem">
            <el-form-item :label="t(`${i18nBase}.apiList.${apiItem}`)" >
              <div class="flex flex-row-reverse w-full box-border">
                <el-input class="flex-1" v-model="confData[apiItem].url">
                  <template #append>
                    <el-select
                      v-model="confData[apiItem].method"
                      style="width: 120px;"
                      placeholder="Method"
                    >
                      <el-option 
                        v-for="item in requestMethodList" 
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item :label="t(`${i18nBase}.apiConfig`)" >
              <RequestResponseConf v-model="confData[apiItem].conf" />
            </el-form-item>
          </div>
          
        </div>
      </el-form>
  </div>
</template>
<script lang="ts" setup>
import { defineModel } from 'vue';
import { requestMethodList } from '@/utils/constants';
import RequestResponseConf from './RequestResponseConf.vue';
import { useI18n } from 'vue-i18n';
const { t }  = useI18n();
const i18nBase = 'components.SettingConf';
const apiList = ['list', 'upload', 'delete', 'update'];

defineProps(['settingFor'])

const confData = defineModel<Record<string, any>>( {required: true, default: {list: {}, upload: {}, delete: {}, update: {}}});
defineEmits(['login', 'save']);
</script>
<style lang="scss">
  
</style>