<template>
  <div class="shadow-sm mx-4 rounded-lg py-4 px-6 flex justify-between text-gray-500 gap-6 bg-white font-sans group/mockItem relative">

    <!-- 删除mockItem按钮 -->
    <div class="absolute top-1 right-1 hidden group-hover/mockItem:block" @click="$emit('delete', mockItemBasicInfo.id)">
      <el-button type="danger" :icon="Delete" circle />
    </div>
    <!-- 精简模式下展开或者关闭 -->
    <SvgIcon 
      v-if="isBriefMode" 
      class="text-gray-300 absolute top-1/2 left-2 transform translate-y-[-50%] cursor-pointer hidden group-hover/mockItem:block" 
      :icon-name="isShowFull ? 'collapse' : 'expand' " 
      @click="isShowFull = !isShowFull" 
    />

    <div class="flex flex-1 flex-col gap-4">

      <div class="grid grid-cols-12 gap-4">

        <!-- api路径 -->
        <div class="col-span-12 flex items-center">
          <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.apiPathLabel`) }}</div>
          <el-input v-model="mockItemBasicInfo.path" />
        </div>

        <div :class="{'col-span-12 grid grid-cols-12 gap-4': true, 'is-brief-mode': isBrierf, 'not-brief-mode': !isBrierf}">
          <!-- 接口备注 -->
          <div class="col-span-12 flex items-center">
            <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.apiRemarksLabel`) }}</div>
            <el-input :autosize="{minRows: 1}" resize="none" type="textarea" v-model="mockItemBasicInfo.remarks" />
          </div>
  
          <!-- api名、mock模式 -->
          <div class="col-span-12 flex items-center justify-between">
            <!-- api名 -->
            <div class="flex items-center flex-1 box-border pr-4">
              <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.apiNameLabel`) }}</div>
              <el-input v-model="mockItemBasicInfo.name" />
            </div>
    
            <!-- mock模式 -->
            <div class="flex items-center">
              <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.mockPatternLabel`) }}</div>
              <el-radio-group v-model="mockItemBasicInfo.mockPattern">
                <el-radio-button v-for="item in mockPatternList" :key="item" :label="t(`${i18nBase}.base.mockPatternList.${item}`)" :value="item" />
              </el-radio-group>
            </div>
          </div>
  
  
          <!-- 请求方式 -->
          <div class="col-span-6 flex items-center">
            <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.requestMethodLabel`) }}</div>
            <el-select v-model="mockItemBasicInfo.requestMethod" class="flex-1">
              <el-option
                v-for="item in requestMethodList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
  
          <!-- 接口类型 -->
          <div class="col-span-6 flex items-center">
            <div class="whitespace-nowrap min-w-20 mr-3 text-right font-medium">{{ t(`${i18nBase}.base.apiTypeLabel`) }}</div>
            <el-select v-model="mockItemBasicInfo.type" class="w-24">
              <el-option 
                v-for="item in apiTypeList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
      </div>


      <!-- 场景列表区域 -->
      <div class="flex items-center gap-2">
        <div class="font-bold">
          {{t(`${i18nBase}.scene`)}}：
        </div>

        <SceneItem
          v-for="scene in scenesList"
          :key="scene.id"
          :item-data="scene"
          :is-checked="selectedSceneId === scene.id"
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
    <div class="w-1/3 relative box-border px-4">
      <SimpleAnimation
        animate="fadeInUp"
      >
        <div v-if="!hasBasicConfChange" class="bg-primary-light bg-opacity-90 rounded-lg overflow-hidden text-white">
          <div class="p-2 flex gap-2">
            <span>{{ t(`${i18nBase}.matchedSceneLabel`) }}：</span>
            <span class="font-bold">{{ matchedInfo.sceneName }}</span>
          </div>

          <div :class="{'param-text-bg': !isBrierf, 'param-text-bg-brief': isBrierf}">
            <el-input ref="textAreaRef" type="textarea" :rows="isBrierf ? 2 : 8" :value="matchedInfo.param"></el-input>
          </div>
        </div>
        
        <div v-else class="flex flex-col h-full gap-4">
          <button  class="flex-1 block bg-primary-normal text-white rounded-lg" @click="$emit('save', mockItemBasicInfo)">
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
import { mockPatternList, requestMethodList, apiTypeList } from '@/utils/constants';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import SceneItem from './SceneItem.vue';
import SimpleAnimation from './SimpleAnimation.vue';
import type { MockItemBasicType, SceneItemType } from '@/types/common'
import { Delete } from '@element-plus/icons-vue'
const { t }  = useI18n();
const i18nBase = 'components.MockItem';

interface MockItemProps {
  isBriefMode: boolean;
  basicInfo: MockItemBasicType;
  selectedSceneId?: string;
  scenesList: SceneItemType[];
  matchedInfo: {
    sceneName: string;
    param: string;
  }
}

const props = withDefaults(defineProps<MockItemProps>(), {
  isBriefMode: false,
  basicInfo: () => ({
    id: '',
    path: '',
    name: '',
    remarks: '',
    requestMethod: 'GET',
    mockPattern: 'mock',
    type: 'HTTP',
    currentScene: '',
  }),
  selectedSceneId: '',
  scenesList: () => ([]),
  matchedInfo: () => ({
    sceneName: '--',
    param: '',
  }),
})
// textarea的引用
const textAreaRef = ref(null as any);
// mockItem的基础信息（除了场景列表）
const mockItemBasicInfo = ref({} as MockItemProps['basicInfo']);
// 当是精简模式时，用于临时展开的mockItem的flag
const isShowFull = ref(false);
// mockItem的配置是否发生更改
const hasBasicConfChange = computed(() => {
  return !isEqual(mockItemBasicInfo.value, props.basicInfo);
});

// 是否是brief模式
const isBrierf = computed(() => props.isBriefMode && !hasBasicConfChange.value && !isShowFull.value);


const componentEvent = defineEmits(['sceneOperation', 'save', 'delete']);

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

watch(() => isBrierf.value, () => {
  if(textAreaRef.value?.textarea) {
    textAreaRef.value.textarea.style.height = '';
  }
});

</script>

<style lang="scss">
.param-text-bg, .param-text-bg-brief {
  position: relative;
  background-color: #fff;
  textarea {
    position: relative;
    background-color: transparent;
    z-index: 9;
    box-shadow: 0 0 0 1px #409eff;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  &::before {
    content: 'Param';
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba($color: #000000, $alpha: 0.1);
    font-size: 48px;
    transition: font-size 0.2s ease-in-out;
    z-index: 1;
  }
}

.param-text-bg-brief {
  &::before {
    font-size: 18px;
    transition: font-size 0.2s ease-in-out;
  }
}


.is-brief-mode {
  max-height: 0;
  transition: max-height 0.6s ease-in-out;
  overflow: hidden;
}
.not-brief-mode {
  max-height: 150px;
  transition: max-height 0.6s ease-in-out;
  overflow: hidden;
}
</style>
