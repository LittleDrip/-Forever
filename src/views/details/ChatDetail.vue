<script lang="ts" setup>
import { ref } from 'vue';
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from '@/stores/token';
import { ElMessage } from 'element-plus';

const messages = ref([
    { sender: 'ai', text: 'Hi！我是小跃，最近怎么样呢?', avatar: 'https://via.placeholder.com/40' },

]);

const newMessage = ref('');
let eventSource: EventSource | null = null;
const sendMessage = () => {
    // 添加用户消息到聊天记录
    if (newMessage.value.trim()) {
        messages.value.push({
            sender: 'user',
            text: newMessage.value.trim(),
            avatar: 'https://via.placeholder.com/40',
        });

        // 添加一个临时占位符用于显示 AI 的流式消息
        const aiMessage = {
            sender: 'ai',
            text: '', // 流式更新内容
            avatar: 'https://via.placeholder.com/40',
        };
        messages.value.push(aiMessage);
        const aiMessageIndex = messages.value.length; // 获取当前 AI 消息索引
        // 打开 EventSource 进行流式通信
        const messageContent = newMessage.value.trim();
        const apiUrl = `/api/ai/generateStreamAsString?message=${messageContent}`;
        const token = getAccessToken();
        if (!token) {
            console.error('Access token is missing or invalid');
            return;
        }
        eventSource = new EventSourcePolyfill(apiUrl, {
            headers: {
                'satoken': 'Bearer ' + token,
            },
        });
        // 监听消息流
        eventSource.onmessage = (event) => {
            if (event.data === '[complete]') {
                // 检测到完成标志时关闭连接
                eventSource?.close();
                eventSource = null;
                return;
            }
            console.log(event.data);
            if (event.data) {
                // 将新接收到的流内容拼接到当前消息
                messages.value[aiMessageIndex - 1].text += event.data;
            }
        };


        // 监听错误事件
        eventSource.onerror = () => {
            console.error('Error with EventSource');
            if (eventSource) {
                eventSource.close();
                eventSource = null;
            }
        };
        // 清空输入框
        newMessage.value = '';
    } else {
        ElMessage.warning('内容不能为空');
    }
};
</script>

<template>
    <div class="chat-detail">
        <div class="content">
            <div v-for="(message, index) in messages" :key="index" class="message" :class="message.sender">
                <img class="avatar" :src="message.avatar" alt="avatar" />
                <div class="text" v-html="message.text"></div>
            </div>
        </div>
        <div class="MsgSender">
            <!-- <el-input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Type your message..."
                class="message-input" />
            <button @click="sendMessage" class="send-button">Send</button> -->

            <div class="input-wrapper">
                <textarea v-model="newMessage" @keyup.enter="sendMessage" placeholder="向跃心助手发送消息" rows="4"
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 92.5vh;
    width: 100vw;
}

.content {
    margin-top: 2em;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
    overflow-y: auto;
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

    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-bottom: 2em;

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
