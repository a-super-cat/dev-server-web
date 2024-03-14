<template>
  <div class="flex w-full h-80 flex-col box-border">

    <div class="relative">
      <search-bar 
        @search="handleSearch"
        @addMockItem="handleAddMockItem"
      />
    </div>
    
    <div class="flex-1 gap-4 flex flex-col">
      <mock-item 
        v-for="item in mockItemList"
        :key="item.basicInfo.id"
        :basic-info="item.basicInfo"
        :scene-list="item.scenesList"
        @save="handleSaveMockItem"
        @sceneOperation="handleMockItemSceneOperation"
        :selected-scene-id="mockItemAndSelectedSceneIdPair[item.basicInfo.id]"
      />
    </div>
    <el-drawer 
      v-model="isShowCodeEditor" 
      :with-header="false" 
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="h-full w-full relative flex flex-col bg-white text-gray-600 box-border px-4">
        <div class="flex gap-4 pt-2">
          <div class="pl-2 py-1">
            <span>
              {{ t('global.sceneName') }}:
            </span>
          </div>
          <div class="flex-1">
            <input class="border-b outline-none w-full" v-model="currentEditingSceneItem.sceneName" />
          </div>
        </div>
        <div>
          <div class="pl-2 py-1">
            <span>
              {{ t('global.param') }}:
            </span>
          </div>
          <div class="h-52">
          <code-editor v-model:code="currentEditingSceneItem.param" language="json" />
          </div>
        </div>
        
        <div class="flex-1 flex flex-col">
          <div class="pl-2 py-1">
            {{ t('global.responseConfig') }}:
          </div>
          <div class="flex-1">
            <code-editor v-model:code="currentEditingSceneItem.responseConf" @change="test" language="typescript" />
          </div>
        </div>

        <div class="flex items-center gap-4 py-2">
          <el-button 
            v-for="item in editorActions" 
            :key="item" 
            :type=" item === 'close' ? 'info' : 'primary'"
            @click="handleEditoActions(item)"
          >
            {{ t(`${i18nBase}.button.${item}`) }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import {ref, watch, onBeforeMount, } from 'vue'
import { useI18n } from 'vue-i18n';
import CodeEditor from '@/components/CodeEditor.vue';
import SearchBar from '@/components/SearchBar.vue';
import MockItem from '@/components/MockItem.vue';
import { ElMessage } from 'element-plus'
import type { MockItemBasicType, SceneItemType } from '@/types/common';
import {v4 as uuid} from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import JSON5 from 'json5';
import { 
  saveSceneItem,
  saveMockItem,
  getMockList,
} from '@/api/system';
const { t }  = useI18n();

const i18nBase = 'page.HomeView';
const editorActions = ['save', 'saveAndClose', 'close'];
// 当前正在编辑的场景
const currentEditingSceneItem = ref<SceneItemType>({} as SceneItemType);
// 是否显示代码编辑器
const isShowCodeEditor = ref(false);
// mockItem列表
const mockItemList = ref<{basicInfo: MockItemBasicType, scenesList: SceneItemType[]}[]>([] as any);

// 每个mockItem被选中的场景id
const mockItemAndSelectedSceneIdPair = ref<{[key: string]: string}>({});
mockItemAndSelectedSceneIdPair.value = {
  mockItemId1: 'scene1',
  mockItemId2: 'xxx',
};

mockItemList.value = [];

const handleMockItemSceneOperation = (operation: string, mockItemBasicInfo: any, sceneItem: any) => {
  switch (operation) {
    case 'add':
      currentEditingSceneItem.value = {
        id: uuid(),
        name: '',
        param: '',
        responseConf: '',
      };
      isShowCodeEditor.value = true;
      console.log('add', mockItemBasicInfo);
      break;
    case 'select':
      mockItemAndSelectedSceneIdPair.value[mockItemBasicInfo.id] = sceneItem.id;
      break;
    case 'edit':
      {
        console.log('edit', sceneItem);
        currentEditingSceneItem.value = cloneDeep(sceneItem);
        isShowCodeEditor.value = true;
      }
      break;
    case 'delete':
      // handleMockItemSceneSelectedDelete(mockItemBasicInfo, sceneItem);
      break;
    default:
      break;
  }
};

const handleEditoActions = (action: string) => {
  switch (action) {
    case 'save':
      saveSceneItem(currentEditingSceneItem.value);
      console.log('save', JSON5.parse(currentEditingSceneItem.value.param || '') );
      break;
    case 'saveAndClose':
      // testApi({name: '123'})
      console.log('saveAndClose', currentEditingSceneItem.value);
      // isShowCodeEditor.value = false;
      break;
    case 'close':
      isShowCodeEditor.value = false;
      break;
    default:
      break;
  }
};

const test = (code: string) => {
  console.log('code change', code);
};

const handleSearch = (param: any) => {
  console.log('search', param);
};

const handleAddMockItem = () => {
  mockItemList.value.push({
    basicInfo: {
      id: uuid(),
      path: '',
      name: '接口名',
      remarks: '接口备注',
      requestMethod: 'GET',
      mockPattern: 'mock',
    },
    scenesList: [],
  });
  console.log('addMockItem');
};

const handleSaveMockItem = async (mockItemBase: MockItemBasicType) => {
  const res = saveMockItem(mockItemBase);
  console.log('saveMockItem', res);
};

onBeforeMount( async () => {
  const res = await getMockList();
  mockItemList.value = res.data;
});
</script>
<style lang="scss">
  .el-drawer__body {
    @apply p-0;
  }
</style>