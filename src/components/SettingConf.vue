<template >
  <div>
      <el-form label-width="96px" class="pt-6 px-4">
        <el-form-item >
          <div class="flex flex-row-reverse w-full gap-4">
            <el-button :disabled="!!confData.token" type="primary" @click="$emit('login', confData)">{{ t('global.login') }}</el-button>
            <el-button type="primary" @click="$emit('save', confData)">{{ t('global.save') }}</el-button>
          </div>
        </el-form-item>
        <div class="grid grid-cols-2">
          <el-form-item :label="t('global.username')">
            <el-input v-model="confData.username" />
          </el-form-item>

          <el-form-item :label="t('global.password')">
            <el-input v-model="confData.password">
              <template #append>
                <div class="flex gap-6">
                  <el-select
                    v-model="confData.passwordEncryptType"
                    placeholder="EncryptType"
                    style="width: 96px;"
                  >
                    <el-option v-for="item in passwordEncryptTypeList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <input class="block bg-transparent text-center outline-none" v-model="confData.salt" placeholder="salt" style="width: 96px;" />
                </div>
              </template>
            </el-input>
          </el-form-item>

          <div class="col-span-2">
            <el-form-item :label="t('global.loginApi')">
              <div class="flex w-full">
                <el-input class="flex-1" v-model="confData.apiPath">
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

        
        <el-form-item :label="t('global.authConf')">
          <RequestResponseConf v-model="confData.conf" />
        </el-form-item>

        <el-form-item label="token">
          <div class="flex w-full">
            <el-input class="flex-1" type="textarea" v-model="confData.token" />
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
import crypto from 'crypto-js';
import { useI18n } from 'vue-i18n';
const { t }  = useI18n();
const i18nBase = 'components.SettingConf';
const apiList = ['list', 'upload', 'delete', 'update'];

const passwordEncryptTypeList = [
  {label: 'none', value: ''},
  ...Object.keys(crypto).filter(item => item.charAt(0) < 'Z').map(item => ({label: item, value: item})),
];

defineProps(['settingFor'])

const confData = defineModel<Record<string, any>>( {required: true, default: {list: {}, upload: {}, delete: {}, update: {}}});
defineEmits(['login', 'save']);
</script>
<style lang="scss">
  
</style>