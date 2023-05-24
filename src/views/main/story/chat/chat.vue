<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
type InsertFnType = (url: string, alt: string, href: string) => void
const mode = ref('default')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}

const editorConfig: any = {
  placeholder: '请输入内容...',
  MENU_CONF: {}
}

editorConfig.MENU_CONF['codeSelectLang'] = {
  // 代码语言
  codeLangs: [
    { text: 'CSS', value: 'css' },
    { text: 'HTML', value: 'html' },
    { text: 'XML', value: 'xml' }
    // 其他
  ]
}

editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload',
  fieldName: 'img',
  maxFileSize: 5 * 1024 * 1024,
  maxNumberOfFiles: 10,
  allowedFileTypes: ['image/*'],
  withCredentials: true, // 跨域是否传递 cookie
  timeout: 5 * 1000,
  base64LimitSize: 5 * 1024,
  // 自定义上传
  onProgress(progress: number) {
    console.log('progress', progress)
  },
  onSuccess(file: File, res: any) {
    console.log(`${file.name} 上传成功`, res)
  },
  onFailed(file: File, res: any) {
    console.log(`${file.name} 上传失败`, res)
  },
  onError(file: File, err: any, res: any) {
    console.log(`${file.name} 上传出错`, err, res)
  },
  async customInsert(res: any, insertFn: InsertFnType) {
    console.log(res)

    insertFn(res.url, res.alt, res.href)
  }
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor
  console.log('created', editor)
}
const handleChange = (editor: any) => {
  console.log('change:', editor.children)
}
const handleDestroyed = (editor: any) => {
  console.log('destroyed', editor)
}
const handleFocus = (editor: any) => {
  console.log('focus', editor)
}
const handleBlur = (editor: any) => {
  console.log('blur', editor)
}
const customAlert = (info: string, type: any) => {
  alert(`【自定义提示】${type} - ${info}`)
}
const customPaste = (editor: any, event: any, callback: any) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText('xxx')

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault()
  callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
}
</script>
