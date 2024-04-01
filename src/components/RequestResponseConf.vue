<template>
  <div class="w-full">
    <div class="cursor-pointer flex items-center" @click="isCollapse = !isCollapse">
      {{ isCollapse ? '展开' : '收起'  }}
      <SvgIcon 
        class="text-gray-300 inline-block ml-2" 
        :icon-name="!isCollapse ? 'collapse' : 'expand' " 
      />
    </div>
    <div :class="{'collapse': isCollapse, 'expand': !isCollapse}">
      <div class="w-full h-64 relative">
        <CodeEditor lang="json" v-model="code" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineModel } from 'vue'
import CodeEditor from './CodeEditor.vue'
const isCollapse = ref(true);
const code = defineModel<string>({required: true, default: ''});
</script>
<style lang="scss">
.collapse {
  max-height: 0;
  transition: max-height 0.6s ease-in-out;
  overflow: hidden;
}
.expand {
  max-height: 16rem;
  transition: max-height 0.6s ease-in-out;
  overflow: hidden;
}
</style>