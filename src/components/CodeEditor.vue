<template>
  <div ref="codeEditor" class="code-editor">
    
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineEmits, withDefaults, watch } from 'vue';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import type {editor as EditorType} from 'monaco-editor/esm/vs/editor/editor.api';

// 组件props类型
interface CodeEditorProps {
  theme?: string;
  language?: "typescript" | "json";
  modelValue?: string;
}

// 组件props
const props = withDefaults(defineProps<CodeEditorProps>(), {
  theme: 'vs-dark',
  language: 'json',
})
// 组件事件
const componentEvent = defineEmits<{
  change: [code: string], // 代码内容
  'update:modelValue': [value: string]
}>()

const codeEditor = ref(null as unknown as HTMLElement);
const editor = ref(null as unknown as EditorType.IStandaloneCodeEditor);


self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

// 初始化代码编辑器
onMounted(() => {
  // 创建编辑器
  const monacoEditor =  monaco.editor.create(codeEditor.value, {
    value: props.modelValue || '',
    language: props.language,
    theme: props.theme,
    automaticLayout: true,
  });

  // 数据绑定
  monacoEditor.getModel()?.onDidChangeContent(() => {
    const code = monacoEditor.getValue();
    componentEvent('change', code);
    componentEvent('update:modelValue', code);
  });

  editor.value = monacoEditor;
});
</script>
<style lang="scss" scoped>
  .code-editor {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>