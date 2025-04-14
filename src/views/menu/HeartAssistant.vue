<template>
    <div class="back-button" @click="goBack">
        <svg t="1710747179070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4250" width="32" height="32">
            <path
                d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.052938-18.416442-49.91597-18.416442-68.968908 0L291.910961 480.275316c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.439172 345.70441c19.052938 18.416442 49.91597 18.416442 68.968908 0 19.052938-18.416442 19.052938-48.273447 0-66.660212L395.21518 513.604544z"
                p-id="4251"></path>
        </svg>
        返回
    </div>
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
    { label: "分析我的抑郁程度", color: "#626aef" },
    { label: "分析我的焦虑程度", color: "#626aef" },
    { label: "失眠怎么办", color: "#626aef" },
    { label: "冥想小妙招", color: "#626aef" },
    { label: "推荐一些心理健康的书籍", color: "#626aef" },
]);
const goBack = () => {
    router.push('/emotionalDivision');
};
// 点击处理方法
const handleClick = (label: string) => {
    console.log(`点击了按钮: ${label}`);
    router.push({
        name: '聊天详情',
        query: { initialMessage: label }
    });
};
const sendMessage = () => {
    if (message.value.trim()) {
        console.log("发送的消息:", message.value);
        router.push({
            name: '聊天详情',
            query: { initialMessage: message.value.trim() }  // 通过 query 参数传递消息
        });
        message.value = ''; // 清空输入框
    }
};
</script>

<style lang="scss" scoped>
.back-button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 1.2rem;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    color: #666;
    transition: all 0.3s ease;

    &:hover {
        color: #E8D575;
        transform: translateX(-5px);
    }

    svg {
        width: 24px;
        height: 24px;
    }
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 92.5vh;
    text-align: center;

    @media screen and (orientation: landscape) and (max-width: 900px) {
        min-height: 100vh;
        justify-content: center;
        padding: 1em;
    }
}

.welcome-message {
    margin-top: 25vh;
    font-size: 1.8em;
    font-family: 'MiSans';

    @media screen and (orientation: landscape) and (max-width: 900px) {
        margin-top: 0;
        font-size: 1.4em;
    }
}

.input-wrapper {
    position: relative;
    display: flex;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;

    @media screen and (orientation: landscape) and (max-width: 900px) {
        max-width: 90%;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .input-box {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #ccc;
        resize: none;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        @media screen and (orientation: landscape) and (max-width: 900px) {
            max-height: 80px;
        }
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
