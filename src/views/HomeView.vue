<template>
  <div class="flex w-full min-h-full gap-4 flex-col box-border relative bg-gray-50">

    <div class="relative">
      <search-bar 
        @search="handleSearch"
        @addMockItem="handleAddMockItem"
        @iteration-list-change="handleIterationListChange"
        @mock-from-request-change="handleMockFromRequestChange"
        :mockFromRequest="isMockItemFromRequest"
        v-model:iterationList="iterationList"
        v-model:is-brief-mode="isBriefMode"
      />
    </div>
    
    <div class="flex-1 flex flex-col gap-4">
      <mock-item
        v-for="item in mockItemList"
        :key="item.basicInfo.id"
        :basic-info="item.basicInfo"
        :scenes-list="item.scenesList"
        :is-brief-mode="isBriefMode"
        @save="handleSaveMockItem"
        @delete="handleDeleteMockItem"
        @sceneOperation="handleMockItemSceneOperation"
        :selected-scene-id="mockItemAndSelectedSceneIdPair[item.basicInfo.id]"
        :matched-info="mockItemMatchedParam[item.basicInfo.id]"
      />
    </div>
    <el-drawer 
      v-model="isShowCodeEditor" 
      :with-header="false" 
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="h-full w-full relative flex flex-col bg-white text-gray-600 box-border px-4">
        <div class="flex gap-4 pt-4">
          <div class="flex-1 flex gap-4">
            <div class="pl-2 py-1 whitespace-nowrap">
              <span>
                {{ t('global.sceneName') }}:
              </span>
            </div>
            <div class="flex-1">
              <input class="border-b outline-none w-full" v-model="currentEditingSceneItem.name" />
            </div>
          </div>

          <div class="flex gap-4">
            <div class="pl-2 py-1 whitespace-nowrap">
              <span>
                {{ t('global.iteration') }}:
              </span>
            </div>
            <div class="w-32">
              <el-select v-model="currentEditingSceneItem.iteration">
                <el-option 
                  v-for="item in iterationList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div>
          <div class="pl-2 py-1">
            <span>
              {{ t('global.param') }}:
            </span>
          </div>
          <div class="h-52">
          <code-editor v-model="currentEditingSceneItem.param" language="json" />
          </div>
        </div>
        
        <div class="flex-1 flex flex-col">
          <div class="pl-2 py-1">
            {{ t('global.responseConfig') }}:
          </div>
          <div class="flex-1">
            <code-editor v-model="currentEditingSceneItem.responseConf" language="typescript" />
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

    <div class="w-full h-16 flex items-center flex-row-reverse bg-white pr-9">
      <el-pagination
        v-model:current-page="pageInfo.current"
        v-model:page-size="pageInfo.size"
        :total="pageInfo.total"
        :pager-count="5"
        layout="prev, pager, next, sizes"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onBeforeMount, watch } from 'vue'
import { useI18n } from 'vue-i18n';
import CodeEditor from '@/components/CodeEditor.vue';
import SearchBar from '@/components/SearchBar.vue';
import MockItem from '@/components/MockItem.vue';
import { ElMessage } from 'element-plus'
import type { MockItemBasicType, SceneItemType, MockItemMatchedInfoType } from '@/types/common';
import {v4 as uuid} from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import JSON5 from 'json5';
import { registerWsCallBack, clearEventCallBack } from '@/utils/request'
import {
  search,
  saveMockItem,
  deleteMockItem,
  getSceneItemResponseConf,
  saveSceneItem,
  deleteSceneItem,
  selectSceneItem,
  getIterationList,
  saveIterationList,
  isCreateMockItemFromRequest,
  getIsCreateMockItemFromRequest,
} from '@/api/system';

const { t }  = useI18n();

const i18nBase = 'page.HomeView';
const editorActions = ['save', 'saveAndClose', 'close'];
// 迭代期
const iterationList = ref<string[]>([]);
// 搜索参数
const searchParam = ref({} as any);
// 是否从请求中创建mockItem
const isMockItemFromRequest = ref(false);
// 是否简洁模式
const isBriefMode = ref(false);
// 当前正在编辑的mockItem
const currentEditingMockItemBaseInfo = ref<MockItemBasicType>({} as MockItemBasicType);
// 当前正在编辑的场景
const currentEditingSceneItem = ref<SceneItemType>({} as SceneItemType);
// 是否显示代码编辑器
const isShowCodeEditor = ref(false);
// mockItem列表
const mockItemList = ref<{basicInfo: MockItemBasicType, scenesList: SceneItemType[]}[]>([] as any);
// 每个mockItem被选中的场景id
const mockItemAndSelectedSceneIdPair = ref<{[key: string]: string}>({});
// 分页信息
const pageInfo = ref({current: 1, size: 10, total: 0} as {current: number, size: number, total: number});
// 被匹配到的mockItem的参数信息
const mockItemMatchedParam = ref({} as MockItemMatchedInfoType);

const handleSearch = (param: any) => {
  searchParam.value = param;
  pageInfo.value = { ...pageInfo.value, current: 1 };
};

// 保存迭代期列表
const handleIterationListChange = async (list: string[]) => {
  const res = await saveIterationList({list});
  if (res.code !== 200) {
    ElMessage.error(`${t('global.save')}${t('global.iteration')}: ${t('global.fail')}`);
  }
};

// 获取迭代期列表
const handleGetIterationList = async () => {
  const res = await getIterationList();
  if (res.code === 200) {
    iterationList.value = res.data;
  } else {
    ElMessage.error(`${t('global.get')}${t('global.iteration')}: ${t('global.fail')}`);
  }
};

// 场景变化后的处理
const handleAfterChangeMockItemScene = (mockItemId: string, newSceneList: SceneItemType[]) => {
  const mockItem = mockItemList.value.find(item => item.basicInfo.id === mockItemId);
  if (mockItem) {
    mockItem.scenesList = newSceneList;
  }
}

// 处理mockItem场景操作
const handleMockItemSceneOperation = async (operation: string, mockItemBasicInfo: any, sceneItem: any) => {
  currentEditingMockItemBaseInfo.value = mockItemBasicInfo;
  console.log('operation', operation, mockItemBasicInfo, sceneItem);
  switch (operation) {
    case 'add':
      currentEditingSceneItem.value = {
        id: uuid(),
        name: t('global.sceneName'),
        iteration: iterationList.value[0] ?? '',
        param: '{\r\n  \r\n}',
        requestMethod: 'GET',
        type: 'HTTP',
        responseConf: 'export default (param: any) => {\r\n  \r\n}',
      };
      isShowCodeEditor.value = true;
      break;
    case 'select':
      {
        const currentMockItemSelectedSceneId = mockItemAndSelectedSceneIdPair.value[mockItemBasicInfo.id];
        const nextMockItemSelectedSceneId = currentMockItemSelectedSceneId === sceneItem.id ? '' : sceneItem.id;
        await selectSceneItem({ mockItemId: mockItemBasicInfo.id, sceneId: nextMockItemSelectedSceneId });
        mockItemAndSelectedSceneIdPair.value[mockItemBasicInfo.id] = nextMockItemSelectedSceneId;
      }
      break;
    case 'edit':
      {
        const sceneItemResponseConf = await getSceneItemResponseConf({mockItemId: mockItemBasicInfo.id, sceneId: sceneItem.id});
        if (!sceneItemResponseConf.data) {
          ElMessage.error(`${t('global.get')}${t('global.scene')}${t('global.config')}: ${t('global.fail')}`);
          return;
        }
        currentEditingSceneItem.value = {
          ...cloneDeep(sceneItem),
          responseConf: sceneItemResponseConf.data,
        };
        isShowCodeEditor.value = true;
      }
      break;
    case 'delete':
      {
        const res = await deleteSceneItem({mockItemId: mockItemBasicInfo.id, sceneId: sceneItem.id});
        if (res.code === 200) {
          ElMessage.success(`${t('global.delete')}: ${t('global.success')}`);
          handleAfterChangeMockItemScene(mockItemBasicInfo.id, res.data);
        } else {
          ElMessage.error(`${t('global.delete')}${t('global.fail')} ${res.msg}`);
        }
      }
      break;
    default:
      break;
  }
};

// 保存场景
const handleSaveSceneItem = async (isCloseCodeEditor = false) => {
  const res = await saveSceneItem({
    ...currentEditingSceneItem.value,
    mockItemId: currentEditingMockItemBaseInfo.value.id,
  });
  if (res.code === 200) {
    ElMessage.success(`${t('global.save')}: ${t('global.success')}`);
    const item = res.data.find((item: any) => item.id === currentEditingSceneItem.value.id);
    if (item) {
      currentEditingSceneItem.value = item;
    }
    if (isCloseCodeEditor) {
      isShowCodeEditor.value = false;
    }
    handleAfterChangeMockItemScene(currentEditingMockItemBaseInfo.value.id, res.data);
  } else {
    ElMessage.error(`${t('global.save')}${t('global.fail')} ${res.msg}`);
  }
};

const handleEditoActions = async (action: string) => {
  switch (action) {
    case 'save':
      await handleSaveSceneItem();
      break;
    case 'saveAndClose':
      await handleSaveSceneItem(true);
      break;
    case 'close':
      isShowCodeEditor.value = false;
      break;
    default:
      break;
  }
  if(action !== 'save')
   currentEditingMockItemBaseInfo.value = {} as MockItemBasicType;
};

const handleAddMockItem = () => {
  mockItemList.value.unshift({
    basicInfo: {
      id: uuid(),
      path: '',
      name: t('global.apiName'),
      type: 'HTTP',
      remarks: t('global.apiRemarks'),
      requestMethod: 'GET',
      mockPattern: 'mock',
    },
    scenesList: [],
  });
  console.log('addMockItem');
};

// 获取mockItem列表
const handleGetMockList = async () => {
  const res = await search({
    ...pageInfo.value,
    ...searchParam.value,
  });
  if (res.code === 200) {
    const { list = [], pageInfo } = res.data;
    list.forEach((item: any) => {
      mockItemAndSelectedSceneIdPair.value[item.basicInfo.id] = item.basicInfo.selectedSceneId;
    });
    if (list?.length) {
      mockItemList.value = list;
    } else {
      mockItemList.value = [{
        basicInfo: {
          id: uuid(),
          path: '',
          name: t('global.apiName'),
          type: 'HTTP',
          remarks: t('global.apiRemarks'),
          requestMethod: 'GET',
          mockPattern: 'mock',
        },
        scenesList: [],
      }];
    }
    pageInfo.value = { ...pageInfo.value, ...pageInfo };
  } else {
    ElMessage.error(`${t('gloabl.get')}Mock${t('global.list')}: ${t('global.fail')}`);
  }
};

// 保存mockItem
const handleSaveMockItem = async (mockItemBase: MockItemBasicType) => {
  const res = await saveMockItem(mockItemBase);
  if (res.data) {
    ElMessage.success(`${t('global.save')}: ${t('global.success')}`);
    handleGetMockList();
  } else {
    ElMessage.error(`${t('global.save')}: ${t('global.fail')}`);
  }
};

// 删除mockItem
const handleDeleteMockItem = async (mockItemId: string) => {
  const res = await deleteMockItem({id: mockItemId});
  if (res.code === 200) {
    ElMessage.success( `${t('global.delete')}: ${t('global.success')}`);
    handleGetMockList();
  } else {
    ElMessage.error(`${t('global.delete')}: ${t('global.fail')}`);
  }
};

// 处理mockItem被匹配到时的实际请求参数及匹配到的场景
const handleMockItemMatched = (arg: any) => {
  const { matchedScene, mockItemId, param } = arg;
  console.log('matchedInfo', arg);
  mockItemMatchedParam.value[mockItemId] = {
    sceneName: matchedScene,
    param: JSON5.stringify(param, null, 2),
  };
};

// 处理是否从请求中创建mockItem
const handleMockFromRequestChange = async () => {
  const res = await isCreateMockItemFromRequest();
  if (res.code === 200) {
    isMockItemFromRequest.value = res.data;
  } else {
    ElMessage.error(t('global.fail'));
  }
};

// 获取是否从请求中创建mockItem
const flagForIsCreateMockItemFromRequest = async () => {
  const res = await getIsCreateMockItemFromRequest();
  if (res.code === 200) {
    isMockItemFromRequest.value = res.data;
  }
};

watch(() => pageInfo.value, handleGetMockList, { immediate: true, deep: true });

onBeforeMount(() => {
  clearEventCallBack('param');
  registerWsCallBack('param', handleMockItemMatched);
  registerWsCallBack('refresh:mockList', () => {
    pageInfo.value.current = 1;
    handleGetMockList();
  });
  handleGetIterationList();
  flagForIsCreateMockItemFromRequest();
});
</script>
<style lang="scss">
  .el-drawer__body {
    @apply p-0;
  }
</style>