<template>
  <div class=" bg-blue-300 rounded-md overflow-hidden">
    <div class="w-48 border-blue-400 box-border p-1">
      <input v-model="model.name" class="outline-none text-white bg-blue-300 pl-4" @change="$emit('action', 'nameChange', model, index)" />
    </div>
    <div class="w-48 h-36 group/img relative rounded-md overflow-hidden">
      <div class="hidden absolute left-0 top-0 group-hover/img:block bg-black bg-opacity-60 w-full h-full box-border">
        <SvgIcon v-if="model.isFavorited && actions.includes('unfavorite')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="hasFavorited" @click="$emit('action', 'unfavorite', model, index)" />
        <SvgIcon v-if="!model.isFavorited && actions.includes('favorite')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="notFavorited" @click="$emit('action','favorite', model, index)" />
        <SvgIcon v-if="actions.includes('delete')" class="text-white cursor-pointer absolute right-4 top-4" icon-name="trash" @click="$emit('action','delete', model, index)" />
        <SvgIcon v-if="actions.includes('addToSet')" class="text-white cursor-pointer absolute bottom-4 left-4" icon-name="addToAlbum" @click="$emit('action','addToSet', model, index)" />
        <SvgIcon v-if="actions.includes('outOfSet')" class="text-white cursor-pointer absolute top-4 left-4" icon-name="outOfAlbum" @click="$emit('action','outOfSet', model, index)" />
      </div>
  
      <img 
        :src="model.url" 
        :alt="model.name"
        class="w-full h-full object-cover border-none block"
        style="object-position: center top" 
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
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

withDefaults(defineProps<ImageItemProps>(), {
  index: 0,
  actions: () => ['favorite', 'unfavorite', 'delete', 'addToSet', 'nameChange'],
});

const model = defineModel({type: Object, required: true, default: (): ImageItemModelProps => ({
  name: '',
  url: '',
  extension: '',
  isFavorited: false,
})});
defineEmits(['action']);
</script>
