<template>
    <div class="container">
        <div class="welcome-message">
            <h1>有什么可以帮忙的？</h1>

        </div>
        <div class="input-wrapper">
            <textarea v-model="message" @keyup.enter="sendMessage" placeholder="向跃心助手发送消息" rows="4"
                class="input-box"></textarea>
            <button @click="sendMessage" class="send-btn">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z">
                    </path>
                </svg>
            </button>
        </div>
        <div class="promptCard">
            <div class="row">
                <el-button v-for="(button, index) in buttons.slice(0, 3)" :key="index" :color="button.color" plain round
                    @click="handleClick(button.label)">
                    {{ button.label }}
                </el-button>
            </div>
            <div class="row">
                <el-button style="margin-top: 1em;" v-for="(button, index) in buttons.slice(3)" :key="index"
                    :color="button.color" plain round @click="handleClick(button.label)">
                    {{ button.label }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
const message = ref('');
// 按钮数据列表
const buttons = ref([
    { label: "分析我做过的所有测试", color: "#626aef" },
    { label: "根据我的焦虑测试做出评估", color: "#626aef" },
    { label: "失眠怎么办", color: "#626aef" },
    { label: "冥想小妙招", color: "#626aef" },
    { label: "推荐一些心理健康的书籍", color: "#626aef" },
]);

// 点击处理方法
const handleClick = (label: any) => {
    console.log(`点击了按钮: ${label}`);
};
const sendMessage = () => {
    if (message.value.trim()) {
        console.log("发送的消息:", message.value);
        message.value = ''; // 清空输入框
        router.push({ name: '聊天详情' });
    }
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 92.5vh;
    text-align: center;
}

.welcome-message {
    margin-top: 25vh;
    font-size: 1.8em;
    font-family: 'MiSans';
}

.input-wrapper {
    position: relative;
    display: flex;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;

    .input-box {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #ccc;
        resize: none;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
    }

    .input-box:focus {
        border-color: #007bff;
    }

    .send-btn {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 40px;
        height: 40px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        /* 使按钮圆形 */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        /* SVG 居中 */
        transition: background-color 0.2s;
    }

    .send-btn:hover {
        background-color: #0056b3;
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    .promptCard {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .row {
        display: flex;
        gap: 10px;
    }
}
</style>
