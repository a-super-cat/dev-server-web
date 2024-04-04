<template>
  <div class="bg-white shadow-md shadow-gray-300 rounded-md">
    <div class="box-border p-1">
      <input v-model="model.name" class="outline-none text-center text-gray-600 pl-4" @change="$emit('action', 'nameChange', model, index)" />
    </div>
    <div class="w-48 h-36 group/img relative rounded-md overflow-hidden">
      <div class="hidden absolute left-0 top-0 group-hover/img:block bg-black bg-opacity-60 w-full h-full box-border">
        <SvgIcon v-if="model.isFavorited && actions.includes('unfavorite')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="hasFavorited" @click="$emit('action', 'unfavorite', model, index)" />
        <SvgIcon v-if="!model.isFavorited && actions.includes('favorite')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="notFavorited" @click="$emit('action','favorite', model, index)" />
        <SvgIcon v-if="actions.includes('delete')" class="text-white cursor-pointer absolute right-4 top-4" icon-name="trash" @click="$emit('action','delete', model, index)" />
        <SvgIcon v-if="actions.includes('addToSet')" class="text-white cursor-pointer absolute bottom-4 left-4" icon-name="addToAlbum" @click="$emit('action','addToSet', model, index)" />
        <SvgIcon v-if="actions.includes('outOfSet')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="outOfAlbum" @click="$emit('action','outOfSet', model, index)" />
        <SvgIcon class="text-white cursor-pointer absolute bottom-4 right-4" icon-name="copy" @click="handleCopyFileUrl" />
      </div>
  
      <img 
        :src="icon === 'image' ? model.url : icon" 
        :alt="model.name"
        :class="{'w-full h-full border-none block': true, 'object-cover': icon === 'image', 'object-contain': icon !== 'image'}"
        style="object-position: center top" 
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import SvgIcon from './SvgIcon.vue';
import { getAssetsIcon } from '@/utils/tools'
const actionTypeList = ['favorite', 'unfavorite', 'delete', 'addToSet', 'nameChange', 'outOfSet']  as const;
type ActionType = typeof actionTypeList[number];
interface ImageItemModelProps {
  name: string;
  url: string;
  extension: string;
  isFavorited?: boolean;
}
interface ImageItemProps {
  index: number;
  actions?: Array<ActionType>;
}

defineEmits(['action']);

withDefaults(defineProps<ImageItemProps>(), {
  index: 0,
  actions: () => ['favorite', 'unfavorite', 'delete', 'addToSet', 'nameChange'],
});

const model = defineModel<ImageItemModelProps>({required: true, default: () => ({
  name: '',
  url: '',
  extension: '',
  isFavorited: false,
})});

const icon = computed(() => getAssetsIcon(model.value.extension));

const handleCopyFileUrl = () => {
  navigator.clipboard.writeText(model.value.url).then(() => {
    ElMessage.success('Copy success');
  }).catch(() => {
    ElMessage.error('Copy failed');
  });
};
</script>
