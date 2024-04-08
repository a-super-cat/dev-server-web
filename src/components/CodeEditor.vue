<template>
  <div ref="codeEditor" class="code-editor">
    
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, withDefaults, defineModel } from 'vue';
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
};

// 组件props
const props = withDefaults(defineProps<CodeEditorProps>(), {
  theme: 'vs-dark',
  language: 'json',
});
const code = defineModel<string>({ default: ''});
// 组件事件
const componentEvent = defineEmits<{
  change: [code: string], // 代码内容
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
    value: code.value || '',
    language: props.language,
    theme: props.theme,
    tabSize: 2,
    automaticLayout: true,
  });

  if(props.language === 'json') {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [],
      enableSchemaRequest: false,
      allowComments: true,
      trailingCommas: 'ignore',
    });
    monaco.languages.json.jsonDefaults.setModeConfiguration({
      documentFormattingEdits: true,
      documentRangeFormattingEdits: true,
      completionItems: true,
      hovers: true,
      documentSymbols: true,
      tokens: true,
      colors: true,
      foldingRanges: true,
      diagnostics: true,
      selectionRanges: true,
    });
  }

  // 如果是ts，添加全员变量
  if(props.language === 'typescript') {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare const pathParams: string[];`);
  }

  // 数据绑定
  monacoEditor.getModel()?.onDidChangeContent(() => {
    const value = monacoEditor.getValue();
    code.value = value;
  });

  monacoEditor.onDidBlurEditorText(() => {
    const value = monacoEditor.getValue();
    componentEvent('change', value);
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