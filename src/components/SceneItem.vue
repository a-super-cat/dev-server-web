<template>
  <div
    :class="{
      'scene-item group/sceneItem': true, 
      'bg-primary-light text-white': isChecked,
      'border-solid border border-gray-500 text-gray-500': !isChecked,
    }"
  >
    <SvgIcon class="absolute cursor-pointer hidden left-2 scale-75 group-hover/sceneItem:block" icon-name="edit" @click="$emit('operation', 'edit', itemData)" />
    <span class="cursor-pointer" @click="$emit('operation', 'select', itemData)">
      {{ itemData.name }}
    </span>
    <SvgIcon class="absolute cursor-pointer hidden right-2 scale-75 group-hover/sceneItem:block" icon-name="trash" @click="$emit('operation', 'delete', itemData)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SceneItemType } from '@/types/common';

interface SceneItemProps {
  isChecked: boolean;
  itemData: SceneItemType;
}
const props = withDefaults(defineProps<SceneItemProps>(), {
  isChecked: false,
  itemData: () => ({} as SceneItemType),
})

const code = ref('');

watch(() => props.itemData.code, (newVal) => {
  code.value = newVal || '';
})

</script>
<style lang="scss">
.scene-item {
  position: relative;
  padding: 0 42px;
  height: 32px;
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  box-sizing: border-box;
  border-radius: 16px;
}
</style>