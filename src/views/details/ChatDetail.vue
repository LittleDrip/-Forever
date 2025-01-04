<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from '@/stores/token';
import { ElMessage } from 'element-plus';
import Markdown from 'vue3-markdown-it';
import { useRoute, useRouter } from 'vue-router';

const messages = ref([
    { sender: 'ai', text: 'Hi！我是小跃，最近怎么样呢?', avatar: 'https://via.placeholder.com/40' },

]);

const newMessage = ref('');
let eventSource: EventSource | null = null;
const isGenerating = ref(false); // 表示当前是否正在生成内容

const route = useRoute();
const router = useRouter();

const handleInitialMessage = () => {
    const initialMessage = route.query.initialMessage as string;
    if (initialMessage) {
        newMessage.value = initialMessage;
        sendMessage();
    }
};

onMounted(() => {
    handleInitialMessage();
});

const stopGenerating = () => {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
        isGenerating.value = false; // 重置状态
        ElMessage.info('生成已中断');
    }
};

const checkAndPromptTest = (message: string) => {
    // 定义可能触发测试的关键词
    const testKeywords = ['诊断测试页'];

    // 检查消息中是否包含这些关键词
    const hasTestKeyword = testKeywords.some(keyword => message.includes(keyword));

    if (hasTestKeyword) {
        // 弹出通知并保存通知实例
        const notificationInstance = ElNotification({
            title: '提示',
            message: `
                检测到有相关测试未完成，是否前往测试页？
                <div style="margin-top: 10px; text-align: right;">
                    <button class="el-button el-button--default" onclick="continueConversation()">继续对话</button>
                    <button class="el-button el-button--primary" onclick="goToTestPage()">前往答题</button>
                </div>
            `,
            type: 'info',
            duration: 0, // 不自动关闭
            dangerouslyUseHTMLString: true,
        });

        // 定义按钮操作逻辑
        const continueConversation = () => {
            console.log('继续对话逻辑处理...');
            notificationInstance.close(); // 关闭通知
        };

        const goToTestPage = () => {
            router.push({ name: '诊断测试' });
            notificationInstance.close(); // 关闭通知
            // 可在此添加跳转逻辑，例如使用路由跳转
        };

        // 将函数挂载到全局，方便按钮点击时调用
        (window as any).continueConversation = continueConversation;
        (window as any).goToTestPage = goToTestPage;
    }
}




const sendMessage = () => {
    const trimmedMessage = newMessage.value.trim(); // 缓存去除空格后的消息

    // 添加用户消息到聊天记录
    if (trimmedMessage) {
        isGenerating.value = true; // 开始生成

        messages.value.push({
            sender: 'user',
            text: trimmedMessage,
            avatar: 'https://via.placeholder.com/40',
        });

        // 添加一个临时占位符用于显示 AI 的流式消息
        const aiMessage = {
            sender: 'ai',
            text: '', // 流式更新内容
            avatar: 'https://via.placeholder.com/40',
        };
        messages.value.push(aiMessage);
        const aiMessageIndex = messages.value.length - 1; // 获取当前 AI 消息索引
        // 打开 EventSource 进行流式通信
        const token = getAccessToken();
        if (!token) {
            console.error('Access token is missing or invalid');
            ElMessage.error('无法获取访问令牌');
            return;
        }
        const apiUrl = `/api/ai/generateStreamAsString?message=${trimmedMessage}`;
        eventSource = new EventSourcePolyfill(apiUrl, {
            headers: {
                'satoken': 'Bearer ' + token,
            },
        });
        // 监听消息流
        eventSource.onmessage = (event) => {
            if (event.data === '[complete]') {
                eventSource?.close();
                eventSource = null;
                isGenerating.value = false;
                // 在消息完成后检查整个消息内容
                checkAndPromptTest(messages.value[messages.value.length - 1].text);
                return;
            }
            console.log(event.data);
            if (event.data) {
                messages.value[aiMessageIndex].text += event.data;
            }
        };


        // 监听错误事件
        eventSource.onerror = () => {
            console.error('Error with EventSource');
            if (eventSource) {
                eventSource.close();
                eventSource = null;
                isGenerating.value = false;
            }
        };
        // 清空输入框
        newMessage.value = '';
    } else {
        ElMessage.warning('内容不能为空');
        return
    }
};

</script>

<template>

    <div class="chat-detail">
        <div class="content-warpper">
            <div class="content">
                <div v-for="(message, index) in messages" :key="index" class="message" :class="message.sender">
                    <img class="avatar" :src="message.avatar" alt="avatar" />
                    <Markdown class="text" :source="message.text" :breaks="true" />
                </div>
            </div>
        </div>
        <div class="MsgSender">
            <!-- <el-input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Type your message..."
                class="message-input" />
            <button @click="sendMessage" class="send-button">Send</button> -->

            <div class="input-wrapper">
                <textarea v-model="newMessage" placeholder="向跃心助手发送消息" rows="4" class="input-box"></textarea>
                <button class="send-btn">
                    <svg @click="sendMessage" v-if="!isGenerating" class="icon" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z">
                        </path>
                    </svg>

                    <svg @click="stopGenerating" v-if="isGenerating" t="1734592781368" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2125" width="32"
                        height="32">
                        <path
                            d="M847.9 170.6c4.4 0 8 3.6 8 8v670c0 4.4-3.6 8-8 8h-670c-4.4 0-8-3.6-8-8v-670c0-4.4 3.6-8 8-8h670m0-72h-670c-44.2 0-80 35.8-80 80v670c0 44.2 35.8 80 80 80h670c44.2 0 80-35.8 80-80v-670c0-44.2-35.8-80-80-80z"
                            fill="#ffffff" p-id="2126"></path>
                    </svg>
                </button>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 92.5vh;
    width: 100%;
    overflow-x: hidden;
    /* 禁止水平滚动 */
    // 超出隐藏

}

.content-warpper {

    width: 100vw;
    max-height: 70vh;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: flex-start;
    /* 垂直对齐方式为起始位置 */
    padding-top: 2em;
    overflow-y: auto;
    /* 如果需要在顶部留出空间 */
}

.content {
    /* 假设.MsgSender的高度是50px */
    width: 60%;
    /* 设置宽度为父容器的60% */
    max-width: 1200px;
    /* 可以设置一个最大宽度，防止内容区域过宽 */
    min-width: 600px;
    /* 设置一个最小宽度，防止内容区域过窄 */

    /* 允许垂直滚动 */
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.message {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.message.ai {
    justify-content: flex-start;
}

.message.user {
    flex-direction: row-reverse;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.text {
    max-width: 70%;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 0.8em 1em;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}

.message.user .text {
    background-color: #2d65f7;
    color: #fff;
}

.MsgSender {
    position: absolute;
    bottom: 1em;
    width: 100%;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: center;
    text-align: center;
    align-items: center;

    /* 添加阴影效果 */
    .input-wrapper {
        position: relative;
        display: flex;
        gap: 10px;
        margin-top: 30px;
        margin-bottom: 20px;
        width: 100%;
        max-width: 700px;

        .input-box {
            width: 100%;
            padding: 10px;
            border-radius: 20px;
            border: 1px solid #ccc;
            resize: none;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
}
</style>