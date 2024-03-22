<template>
  <div class="search-bar-component flex justify-between px-4 py-2">
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

      <el-form-item>
        <el-button @click="$emit('search', param)" type="primary">{{ t(`${i18nBase}.searchBtn`) }}</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" @click="$emit('addMockItem')">{{ t(`${i18nBase}.createNewMockItem`) }}</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineModel } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
const { t }  = useI18n();

const i18nBase = 'components.SearchBar'
const iterationList = defineModel('iterationList', {type: Array, default: []});

const toAddIterationTag = ref('');

const param = ref({
  searchText: '', // 查找的字符串（path、接口名、接口备注）
  iteration: '', // 迭代版本tag，
});

const componentEvent = defineEmits(['search', 'addMockItem', 'iterationListChange']);

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

</script>
<style lang="scss">
.search-bar-component {
  .el-form-item {
    margin-bottom: 0;
  }
}
  
</style>