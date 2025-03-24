<template>
    <div v-if="showPrompt" class="landscape-prompt">
        <div class="prompt-content">
            <el-icon class="rotate-icon">
                <Iphone />
            </el-icon>
            <p>请旋转设备至横屏模式以获得最佳浏览体验</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Iphone } from '@element-plus/icons-vue'

const showPrompt = ref(false)

const checkOrientation = () => {
    // 检查是否是移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) return

    // 检查屏幕方向，现在是竖屏时显示提示
    if (window.orientation === 0 || window.orientation === 180) {
        showPrompt.value = true
        // 禁止body滚动
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
    } else {
        showPrompt.value = false
        // 恢复body滚动
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.height = ''
    }
}

onMounted(() => {
    checkOrientation()
    window.addEventListener('orientationchange', checkOrientation)
})

onUnmounted(() => {
    window.removeEventListener('orientationchange', checkOrientation)
    // 确保在组件卸载时恢复body滚动
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.height = ''
})
</script>

<style scoped>
.landscape-prompt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.prompt-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rotate-icon {
    font-size: 48px;
    margin-bottom: 16px;
    animation: rotate 1.5s infinite;
    transform: rotate(-90deg);
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-90deg);
    }
}

p {
    font-size: 1.1rem;
    color: #2c3e50;
    margin: 0;
    line-height: 1.5;
}
</style>