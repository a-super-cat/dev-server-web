<template>
  <div class="search-bar-component flex justify-between px-4 py-2 bg-white">
    <el-form :inline="true">
      <el-form-item>
        <div class="w-96">
          <el-input 
            v-model="param.searchText" 
            :placeholder="t(`${i18nBase}.searchInputPlaceholder`)"
            :prefix-icon="Search"
          />
        </div>
      </el-form-item>
      <el-form-item class="items-center" :label="t('global.iteration') + '：'">
        <div class="w-56">
          <el-select v-model="param.iteration" :placeholder="t(`${i18nBase}.iterativeTagPlaceholder`)" clearable>
            <template #header>
              <div class="relative flex">
                <el-input v-model="toAddIterationTag">
                  <template #append>
                    <SvgIcon class="cursor-pointer" icon-name="save" @click="handleSaveIterationTag" />
                  </template>
                </el-input>
              </div>
            </template>
            <el-option
              v-for="item in iterationList"
              :key="item"
              :label="item"
              :value="item"
            >
              <template #default>
                <div class="flex justify-between box-border items-center">
                  {{ item }}
                  <SvgIcon class="cursor-pointer text-gray-400 hover:text-gray-500" icon-name="trash" @click.stop="handleDeleteIterationTag(item)" />
                </div>
              </template>
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item :label="t(`${i18nBase}.mockFromRequestLabel`)" class="items-center">
        <el-switch
          v-model="innerMockFromRequest"
          size="large"
          @change="$emit('mockFromRequestChange', $event)"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="$emit('search', param)" type="primary">{{ t(`${i18nBase}.searchBtn`) }}</el-button>
      </el-form-item>

      <el-switch
        v-model="isBriefMode"
        size="large"
        class="ml-2"
        inline-prompt
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #409eff"
        :active-text="t(`${i18nBase}.formOfDisplay.brief`)"
        :inactive-text="t(`${i18nBase}.formOfDisplay.normal`)"
      />
    </el-form>

    <div>
      <el-button type="primary" @click="$emit('addMockItem')">{{ t(`${i18nBase}.createNewMockItem`) }}</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineModel, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
const { t }  = useI18n();

const i18nBase = 'components.SearchBar'

interface Props {
  mockFromRequest: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mockFromRequest: false,
});
const iterationList = defineModel('iterationList', {type: Array, default: []});
const isBriefMode = defineModel('isBriefMode', {type: Boolean, default: false});

const componentEvent = defineEmits(['search', 'addMockItem', 'iterationListChange', 'mockFromRequestChange']);

const toAddIterationTag = ref('');
const innerMockFromRequest = ref(props.mockFromRequest);

const param = ref({
  searchText: '', // 查找的字符串（path、接口名、接口备注）
  iteration: '', // 迭代版本tag，
});


const handleSaveIterationTag = () => {
  if (toAddIterationTag.value) {
    const newIterationList = [toAddIterationTag.value, ...iterationList.value];
    iterationList.value = newIterationList;
    toAddIterationTag.value = '';
    componentEvent('iterationListChange', newIterationList);
  }
};

const handleDeleteIterationTag = (tag: any) => {
  const newIterationList = iterationList.value.filter(item => item !== tag);
  iterationList.value = newIterationList;
  if(!newIterationList.includes(param.value.iteration)) {
    param.value.iteration = '';
  }
  componentEvent('iterationListChange', iterationList.value);
};

watch(() => props.mockFromRequest, (value) => {
  innerMockFromRequest.value = value;
});

</script>
<style lang="scss">
.search-bar-component {
  .el-form-item {
    margin-bottom: 0;
  }
}
  
</style>