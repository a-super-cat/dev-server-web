<template>
  <div class="flex w-80 h-80">
    <el-button type="primary" @click="isShowCodeEditor = true">Primary</el-button>
    <el-drawer v-model="isShowCodeEditor" title="I am the title" :with-header="false">
      <code-editor v-model="codeValue" />
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import CodeEditor from '@/components/CodeEditor.vue';
const codeValue = ref('');
const isShowCodeEditor = ref(false);
</script>
<style lang="scss">
  .el-drawer__body {
    @apply p-0;
  }
</style>