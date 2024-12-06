<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const value = ref('生活')
const titleValue = ref('')
const options = [
    { value: '生活', label: '生活' },
    { value: '学习', label: '学习' },
    { value: '校园', label: '校园' },
    { value: '其他', label: '其他' },
]

const editorConfig = {
    placeholder: '请输入内容...',
    // 其他配置...
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

const handleChange = (editor) => { }
const handleDestroyed = (editor) => { }
const handleFocus = (editor) => { }
const handleBlur = (editor) => { getText() }
const customAlert = (info, type) => { }

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 提交表单
const submitForm = () => {
    const editor = editorRef.value
    const content = editor ? editor.getHtml() : ''
    console.log('提交的内容:', {
        title: titleValue.value,
        category: value.value,
        content: content,
    })
}

// 组件销毁时销毁编辑器
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

</script>

<template>
    <div class="editor_up">
        <h1 style="margin-bottom: .5em;color: #5e616d">发表新的帖子</h1>
        <p style="color: var(--gray-2);font-size: 1.2em;">发表您的内容之前，请遵守相关法律法规，不要出现脏话骂人这种不文明行为。</p>
        <!-- 使用 flex 布局使 select 和 input 在同一行 -->
        <div class="form-row">
            <el-select v-model="value" placeholder="选择分类" style="width: 240px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input placeholder="请输入帖子标题..." v-model="titleValue" style="margin-left: 10px; " />
        </div>
    </div>

    <div class="editor_down" style="margin-top: 20px;">
        <div style="border: 1px solid #ccc; padding: 10px;">
            <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor :defaultConfig="editorConfig" style="height: 320px; background-color: #f9f9f9;"
                @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed"
                @onFocus="handleFocus" @onBlur="handleBlur" @customAlert="customAlert" />
        </div>
    </div>

    <!-- 提交按钮 -->
    <div style="margin-top: .5em; display: flex; justify-content: flex-end;">
        <el-button type="success" plain @click="submitForm">提交帖子</el-button>
    </div>
</template>

<style scoped>
.editor_up {
    /* margin: 20px; */
    font-family: 'Arial', sans-serif;
}

.editor_down {
    margin-top: 30px;
}



.el-button {
    margin-top: 20px;
    width: 200px;
}

/* Flex 布局，使 select 和 input 在同一行 */
.form-row {
    margin-top: 1em;
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
}

.el-select {
    flex: 0 0 240px;
    /* 固定宽度 */
}

.el-input {
    flex: 1;
    /* 自动填充剩余空间 */
    margin-left: 10px;
    /* 给输入框和选择框之间加点间距 */
}
</style>
