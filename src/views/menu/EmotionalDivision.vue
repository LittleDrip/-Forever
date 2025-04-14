<template>
    <div class="common-sense">
        <div class="emotional-division">
            <div class="division-container">
                <!-- 轻度 -->
                <div class="division-item mild" @click="navigateTo('/mildEmotion')">
                    <div class="division-content">
                        <img src="@/assets/img/division/Mild.png" alt="轻度" class="division-image">
                        <h2 class="division-title">轻度</h2>
                        <p>轻微的情绪波动，容易调节</p>
                    </div>
                </div>

                <!-- 中度 -->
                <div class="division-item moderate" @click="navigateTo('/HeartAssistant')">
                    <div class=" division-content">
                        <img src="@/assets/img/division/Moderate.png" alt="中度" class="division-image">
                        <h2 class="division-title">中度</h2>
                        <p>明显的情绪变化，需要关注</p>
                    </div>
                </div>

                <!-- 重度 -->
                <div class="division-item severe" @click="navigateTo('/IntelligentNavigation')">
                    <div class="division-content">
                        <img src="@/assets/img/division/Severe.png" alt="重度" class="division-image">
                        <h2 class="division-title">重度</h2>
                        <p>强烈的情绪波动，需要及时干预</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
    router.push(path);
};
</script>

<style lang="scss" scoped>
.common-sense {
    display: flex;
    max-height: 92.5vh;
    width: 100%;
    overflow: hidden;
}

.emotional-division {
    width: 100%;
    height: 100vh;
}

.division-container {
    display: flex;
    width: 100%;
    height: 100%;
}

.division-title {
    margin-top: 2em;

}

.division-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100vh;
}

.division-item:hover {
    transform: scale(1.02);
    z-index: 1;
}

.division-content {
    text-align: center;
    padding: 20px;
    color: #000;
}



.division-image {
    object-fit: cover;
    max-width: 100%;
    /* 最大宽度为100% */
    height: 200px;
    /* 高度自动调整以保持纵横比 */
    opacity: 0.85;

}



.division-item h2 {
    font-size: 22px;
    margin-bottom: 8px;
}

.division-item p {
    font-size: 14px;
    opacity: 0.9;
}

.mild {
    background: #e3f2fd;
    color: #333;
}

.moderate {
    background: #fff3e0;
    color: #333;
}

.severe {
    background: #f2b9b2;
}
</style>
