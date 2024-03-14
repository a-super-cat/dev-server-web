<template>
  <div class="search-bar-component flex justify-between px-4">
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
      <el-form-item>
        <el-select v-model="param.iterativeTag" class="m-2" :placeholder="t(`${i18nBase}.iterativeTagPlaceholder`)">
          <el-option
            v-for="item in iterativeTagList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 待定是否需要根据不同的搜索模式来进行搜索 -->
      <el-form-item
        :label="t(`${i18nBase}.searchPatternLabel`)"
      >
        <el-checkbox-group v-model="param.searchPattern">
          <el-checkbox-button
            v-for="item in searchPatternList"
            :key="item"
            :label=" t(`${i18nBase}.searchPatternList.${item}`)"
            :value="item"
          />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button @click="$emit('search', param)" type="primary">{{ t(`${i18nBase}.searchBtn`) }}</el-button>
      </el-form-item>
    </el-form>

    <div class="pt-2">
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

interface Props {
  iterativeTagList?: {label: string, value: string}[],
}

const props = withDefaults(defineProps<Props>(), {
  iterativeTagList: () => [],
})

const param = ref({
  searchText: '', // 查找的字符串（path、接口名、接口备注、参数字段）
  iterativeTag: '', // 迭代版本tag，
  searchPattern: ['path', 'apiName'], // 搜索模式（path、接口名、接口备注、参数字段），为空和全选意思等同都是全选
});

// TODO: 待定是否需要根据不同的搜索模式来进行搜索
// Created by jzw on 2024-01-03
const searchPatternList = [ 'path', 'apiName', 'apiRemarks', 'param' ]

</script>
<style lang="scss">
.search-bar-component {
  .el-form-item {
    margin-bottom: 0;
  }
}
  
</style>