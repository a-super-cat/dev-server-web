<template>
  <div class="shadow-sm min-h-64 mx-4 rounded-lg py-4 px-6 flex justify-between gap-6 bg-white font-sans">
    <div class="flex flex-1 flex-col gap-4">

      <div class="grid grid-cols-12 gap-4">
        <!-- api名 -->
        <div class="col-span-8 flex items-center  ">
          <div class="whitespace-nowrap min-w-20 mr-3 text-right text-gray-500 font-medium">{{ t(`${i18nBase}.base.apiNameLabel`) }}</div>
          <el-input v-model="mockItemBasicInfo.apiName" />
        </div>
        <!-- 请求方式 -->
        <div class="col-span-4 flex items-center">
          <div class="whitespace-nowrap min-w-20 mr-3 text-right text-gray-500 font-medium">{{ t(`${i18nBase}.base.requestMethodLabel`) }}</div>
          <el-select v-model="mockItemBasicInfo.requestMethod" class="flex-1">
            <el-option
              v-for="item in requestMethodList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <!-- api路径 -->
        <div class="col-span-12 flex items-center">
          <div class="whitespace-nowrap min-w-20 mr-3 text-right text-gray-500 font-medium">{{ t(`${i18nBase}.base.apiPathLabel`) }}</div>
          <el-input v-model="mockItemBasicInfo.apiPath" />
        </div>

        <!-- mock模式 -->
        <div class="col-span-6 flex items-center">
          <div class="whitespace-nowrap min-w-20 mr-3 text-right text-gray-500 font-medium">{{ t(`${i18nBase}.base.mockPatternLabel`) }}</div>
          <el-radio-group v-model="mockItemBasicInfo.mockPattern">
            <el-radio-button v-for="item in mockPatternList" :key="item" :label="t(`${i18nBase}.base.mockPatternList.${item}`)" :value="item" />
          </el-radio-group>
        </div>
      </div>

      <!-- 场景列表区域 -->
      <div class="flex items-center gap-2">
        <div class="font-bold">
          {{t(`${i18nBase}.scene`)}}：
        </div>

        <SceneItem
          v-for="scene in sceneList"
          :key="scene.sceneId"
          :item-data="scene"
          :is-checked="selectedSceneId === scene.sceneId"
          @operation="handleSceneOperation"
        />

        <div
          @click="$emit('sceneOperation', 'add', basicInfo)"
          class="h-8 box-border flex items-center cursor-pointer border text-gray-500 border-gray-400 rounded-[16px] px-6"
        >
          <SvgIcon class="scale-75 text-gray-500" icon-name="plus"/>
          {{ t(`${i18nBase}.addScene`) }}
        </div>
      </div>
    </div>
    <!-- mockItem右侧监视及操作区域 -->
    <div class="w-1/3 bg-purple-400 relative box-border p-4">
      <SimpleAnimation
        animate="fadeInUp"
      >
        <div v-if="!hasBasicConfChange" class=" bg-lime-100">
          {{ t(`${i18nBase}.param`) }}
        </div>
        <div v-else class="flex flex-col h-full gap-4">
          <button  class="flex-1 block bg-primary-normal text-white rounded-lg">
            {{ t('global.save') }}
          </button>

          <button class="flex-1 block bg-gray-100 text-black rounded-lg" @click="handleCancelConfigChange">
            {{ t('global.cancel') }}
          </button>
        </div>
      </SimpleAnimation>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { mockPatternList, requestMethodList } from '@/utils/constants';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import SceneItem from './SceneItem.vue';
import SimpleAnimation from './SimpleAnimation.vue';
import type { MockItemBasicType, SceneItemType } from '@/types/common'
const { t }  = useI18n();
const i18nBase = 'components.MockItem';

interface MockItemProps {
  basicInfo: MockItemBasicType;
  selectedSceneId?: string;
  sceneList: SceneItemType[];
}

const props = withDefaults(defineProps<MockItemProps>(), {
  basicInfo: () => ({
    apiPath: '',
    apiName: '',
    apiRemarks: '',
    requestMethod: 'GET',
    mockPattern: 'mock',
    currentScene: '',
  }),
  selectedSceneId: '',
  sceneList: () => ([]),
})

// mockItem的基础信息（除了场景列表）
const mockItemBasicInfo = ref({} as MockItemProps['basicInfo']);
// mockItem的配置是否发生更改
const hasBasicConfChange = computed(() => {
  return !isEqual(mockItemBasicInfo.value, props.basicInfo);
});


const componentEvent = defineEmits(['sceneOperation']);

// 处理场景操作
const handleSceneOperation = (operation: string, sceneItem: any) => {
  componentEvent('sceneOperation', operation, props.basicInfo, sceneItem);
};

// 取消配置更改
const handleCancelConfigChange = () => {
  mockItemBasicInfo.value = cloneDeep(props.basicInfo);
};

// 监听props.basicInfo的变化同步到mockItemBasicInfo
watch(() => props.basicInfo, () => {
  mockItemBasicInfo.value = cloneDeep(props.basicInfo);
}, { immediate: true, deep: true });

</script>