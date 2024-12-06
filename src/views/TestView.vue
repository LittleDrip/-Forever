<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { server } from 'typescript';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()


const editorConfig = {
    placeholder: '请输入内容...',
    // 可继续其他配置...
}

const toolbarConfig = {
    excludeKeys: [
        'group-image',
        'group-video',
        'todo',
        'group-indent',
        'bgColor',
        'group-more-style' // 排除菜单组，写菜单组 key 的值即可
    ]
}

const handleChange = (editor) => { console.log('change:', editor.children) }
const handleDestroyed = (editor) => { console.log('destroyed', editor) }
const handleFocus = (editor) => { console.log('focus', editor) }
const handleBlur = (editor) => { getText() }
const customAlert = (info, type) => { alert(`【自定义提示】${type} - ${info}`) }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const getText = () => {
    const editor = editorRef.value
    if (editor == null) return
    console.log('text', editor.getHtml())
}


const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

</script>

<template>
    <div>
        <div style="width: 50%; border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor :defaultConfig="editorConfig" :defaultContent="defaultContent" style="height: 500px"
                @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed"
                @onFocus="handleFocus" @onBlur="handleBlur" @customAlert="customAlert" @customPaste="customPaste" />
        </div>
    </div>
</template>

<style scoped></style>