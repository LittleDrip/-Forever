<template>
    <div class="chat-input-container">
        <div class="messages">
            <div v-for="(msg, index) in messages" :key="index" class="message">
                <span>{{ msg }}</span>
            </div>
        </div>
        <div class="input-wrapper">
            <textarea v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." rows="4"
                class="input-box"></textarea>
            <button @click="sendMessage" class="send-btn">Send</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Store message input and messages list
const message = ref('');
const messages = ref([]);

// Function to handle sending a message
const sendMessage = () => {
    if (message.value.trim()) {
        messages.value.push(message.value);
        message.value = ''; // Clear input after sending
    }
};
</script>

<style lang="scss">
.chat-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;

    .messages {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .message {
            padding: 10px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            max-width: 80%;
            word-wrap: break-word;
        }
    }

    .input-wrapper {
        display: flex;
        gap: 10px;
        width: 100%;
        align-items: center;

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
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
        }

        .send-btn:hover {
            background-color: #0056b3;
        }
    }
}
</style>
