<template >
  <div class="p-4 flex flex-col min-h-full">
    <div>
      <el-upload
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <div class="flex flex-col items-center h-32 justify-center gap-4">
          <SvgIcon class="text-gray-400" icon-name="upload" width="3.5rem" height="3.5rem" />
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </div>
      </el-upload>
    </div>
  
    <el-tabs 
      v-model="activePanel" 
      class="bg-white box-border p-4 rounded-lg flex-1"
      closable
      @tab-remove="handleRemovePanel"
    >
      <el-tab-pane :label="t(`${i18nBase}.panelTitle.default`)" name="default">
        <div class="flex flex-wrap gap-4">
          <ImageItem 
            v-for="(item, index) in assetsList"
            :key="item.url"
            :index="index"
            v-model="assetsList[index]"
            @action="handleImageAction"
          />
        </div>
      </el-tab-pane>
      
      
      <el-tab-pane :label="t(`${i18nBase}.panelTitle.favorite`)" name="favorite">
        <div class="flex flex-wrap gap-4">
          <ImageItem 
            v-for="(item, index) in favoritedList"
            :key="item.url"
            :index="index"
            :actions="['unfavorite', 'delete']"
            v-model="favoritedList[index]"
            @action="handleImageAction"
          />
        </div>
      </el-tab-pane>
      
      
      <el-tab-pane 
        v-for="(item, index) in panelList" 
        :key="item" 
        :label="item" 
        :name="index"
      >
        <div class="flex flex-wrap gap-4">
          <ImageItem 
            v-for="(imgItem, imgIndex) in otherSetData"
            :key="imgItem.url"
            :index="imgIndex"
            :actions="['outOfSet', 'delete']"
            v-model="otherSetData[imgIndex]"
            @action="handleImageAction"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <Teleport v-if="isModunted" to=".el-tabs__nav-scroll">
      <div class="relative justify-center items-center inline-flex mt-2 ml-4 text-white">
        <el-button type="primary" :icon="Plus" @click="handleAddNewPanel" />
      </div>
    </Teleport>

    <el-dialog v-model="dialogTableVisible" :title="t(`${i18nBase}.addToSet`)" width="480" @opened="afterTableShow">
      <div class="relative pb-16">
        <el-table
          ref="tableRef"
          v-model="assetsList[currentEditingIndex].fileSet"
          :data="panelTableData"
          @selection-change="handleTableSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column property="panel" :label="t(`${i18nBase}.selectPanelTable.panelLabel`)" />
        </el-table>
        
        <el-button class="absolute bottom-2 right-4 py-2" type="primary" @click="handleAddAssetsToSet">{{ t('global.save') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import ImageItem from '@/components/ImageItem.vue';
import type { AssetsItemType } from '@/types/common.d';

const { t } = useI18n();
const i18nBase = 'page.AssetsManagement';

const activePanel = ref<string | number>('default');
const isModunted = ref(false);
const panelList = ref<string[]>([]);
const assetsList = ref<AssetsItemType[]>([]);
const dialogTableVisible = ref(false);
// 选中的要添加到的数据集
const selectedDataSet = ref<string[]>([]);
// 要添加到数据集的数据的索引
const currentEditingIndex = ref<number>(-1);
// 表格ref
const tableRef = ref<any>(null);

assetsList.value.push({
  name: 'test',
  url: 'https://i.postimg.cc/PqS1T023/89.jpg',
  extension: 'jpg',
},
  {
    name: '风景',
    url: 'https://i.postimg.cc/7Y9jnxVt/12.jpg',
    extension: 'jpg',
  }
);

const favoritedList = computed(() => assetsList.value.filter(item => item.isFavorited));

const otherSetData = computed(() => {
  if (typeof activePanel.value === 'number') {
    return assetsList.value.filter(item => item.fileSet?.includes(panelList.value[activePanel.value as any]));
  }
  return [];
});

const handleAddNewPanel = () => {
  ElMessageBox.prompt(t(`${i18nBase}.addPanelModal.panelNamePlaceholder`), t(`${i18nBase}.addPanelModal.title`), {
    confirmButtonText: t(`${i18nBase}.addPanelModal.confirm`),
    cancelButtonText: t(`${i18nBase}.addPanelModal.cancel`),
    inputPattern: /\S/,
    inputErrorMessage: t(`${i18nBase}.addPanelModal.inputErrorMessage`),
  }).then(({ value }) => {
    panelList.value.push(value);
  });
};

const handleRemovePanel = (index: number) => {
  panelList.value.splice(index, 1);
};
// 
const handleImageAction = async (action: string, model: AssetsItemType, index: number) => {
  switch (action) {
    case 'favorite':
      assetsList.value[index].isFavorited = true;
      console.log('favorite', model);
      break;
    case 'unfavorite':
      if (activePanel.value === 'default') {
        assetsList.value[index].isFavorited = false;
      } else {
        favoritedList.value[index].isFavorited = false;
      }
      console.log('unfavorite', model);
      break;
    case 'delete':
      assetsList.value = assetsList.value.filter(item => item.url !== model.url);
      console.log('delete', model);
      break;
    case 'addToSet':
      currentEditingIndex.value = index;
      dialogTableVisible.value = true;
      console.log('addToSet', model, index);
      break;
    case 'outOfSet':
      model.fileSet = model.fileSet?.filter(item => item !== panelList.value[activePanel.value as any]);
      console.log('outOfSet', model);
      break;
    case 'nameChange':
      console.log('nameChange', model);
      break;
    default:
      break;
  }
};

const handleTableSelectionChange = (selection: {panel: string}[]) => {
  selectedDataSet.value = selection.map(item => item.panel);
};

const panelTableData = computed(() => {
  return panelList.value.map(item => ({panel: item}));
});

const handleAddAssetsToSet = () => {
  dialogTableVisible.value = false;
  assetsList.value[currentEditingIndex.value].fileSet = selectedDataSet.value;
};

const afterTableShow = () => {
  tableRef.value.clearSelection();
  tableRef.value.data?.forEach((item: any) => {
    if (assetsList.value[currentEditingIndex.value].fileSet?.includes(item.panel)) {
      tableRef.value.toggleRowSelection(item, true);
    }
  });
};

onMounted(() => {
  isModunted.value = true;
});

</script>
<style lang="scss">
  
</style>