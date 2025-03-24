<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addPostsService } from '@/api/posts'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore();
const userInfo = userStore.userInfo;
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const value = ref('求助倾诉')
const titleValue = ref('')
const options = [
    { value: '求助倾诉', label: '求助倾诉' },
    { value: '经验分享', label: '经验分享' },
    { value: '积极心理', label: '积极心理' },
    { value: '日常成长', label: '日常成长' },
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
const submitForm = async () => {
    const editor = editorRef.value
    const content = editor ? editor.getHtml() : ''
    console.log('提交的内容:', {

        authorName: userInfo.nickname,
        authorAvatarUrl: userInfo.avatar,
        title: titleValue.value,
        category: value.value,
        content: content,
    })

    const data = {
        authorName: userInfo.nickname,
        authorAvatarUrl: userInfo.avatar,
        title: titleValue.value,
        category: value.value,
        content: content
    }
    let res = await addPostsService(data);
    console.log(res);
    if (res.code == 200) {
        ElMessage({
            message: "发表成功",
            type: 'success',
        })
    } else {
        ElMessage({
            message: res.data,
            type: '发表失败',
        })
    }
    // 清空表单
    editor.clear()
    titleValue.value = ''
    value.value = ''
    // 关闭弹窗


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
        <p style="color: var(--gray-2);font-size: 1.2em;">😄 你的声音很重要，让我们听到你的想法和经历。</p>
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
    font-family: 'Arial', sans-serif;
}

.editor_up h1 {
    margin-bottom: .5em;
    color: #5e616d;
    font-size: 1.8em;
}

.editor_up p {
    color: var(--gray-2);
    font-size: 1.2em;
}

.editor_down {
    margin-top: 30px;
}

.el-button {
    margin-top: 20px;
    width: 200px;
}

.form-row {
    margin-top: 1em;
    display: flex;
    align-items: center;
}

.el-select {
    flex: 0 0 240px;
}

.el-input {
    flex: 1;
    margin-left: 10px;
}

@media screen and (max-width: 1200px) {
    .editor_up h1 {
        font-size: 1.6em;
    }

    .editor_up p {
        font-size: 1.1em;
    }

    .el-button {
        width: 180px;
    }

    .el-select {
        flex: 0 0 220px;
    }
}

@media screen and (max-width: 926px) {
    .editor_up h1 {
        font-size: 1.4em;
        margin-bottom: 0.3em;
    }

    .editor_up p {
        font-size: 1em;
        margin-bottom: 0.5em;
    }

    .editor_down {
        margin-top: 10px;
    }

    .el-button {
        width: 160px;
        margin-top: 10px;
    }

    .form-row {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }

    .el-select {
        flex: none;
        width: 100%;
    }

    .el-input {
        margin-left: 0;
    }

    .w-e-text-container {
        height: 200px !important;
        min-height: 200px !important;
        max-height: 200px !important;
    }

    .w-e-toolbar {
        padding: 4px !important;
    }

    .w-e-bar-item {
        padding: 2px !important;
    }
}

@media screen and (max-width: 768px) {
    .editor_up h1 {
        font-size: 1.2em;
        margin-bottom: 0.2em;
    }

    .editor_up p {
        font-size: 0.9em;
        margin-bottom: 0.4em;
    }

    .editor_down {
        margin-top: 8px;
    }

    .w-e-toolbar {
        flex-wrap: wrap;
        padding: 3px !important;
    }

    .w-e-bar-item {
        padding: 2px !important;
        transform: scale(0.9);
    }

    .el-button {
        width: 130px;
        margin-top: 8px;
        padding: 8px 15px;
    }

    .w-e-text-container {
        height: 180px !important;
        min-height: 180px !important;
        max-height: 180px !important;
    }
}

@media screen and (max-width: 480px) {
    .editor_up h1 {
        font-size: 1.1em;
    }

    .editor_up p {
        font-size: 0.85em;
    }

    .editor_down {
        margin-top: 6px;
    }

    .el-button {
        width: 120px;
        margin-top: 6px;
        padding: 6px 12px;
    }

    .w-e-text-container {
        height: 150px !important;
        min-height: 150px !important;
        max-height: 150px !important;
    }

    .w-e-toolbar {
        padding: 2px !important;
    }

    .w-e-bar-item {
        padding: 1px !important;
        transform: scale(0.85);
    }
}
</style>
