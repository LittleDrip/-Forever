<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Timer, VideoPlay, VideoPause, Back } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const isPlaying = ref(false);
const currentTime = ref(0);
const totalTime = ref(0);
const progress = ref(0);

// 添加评分相关的变量
const dialogVisible = ref(false);
const rating = ref(4);  // 默认设置为4分（满意）
const feedback = ref('');

// 训练内容配置
const trainingConfigs = {
    "呼吸冥想": {
        title: "呼吸冥想",
        bgColor: "#E3F2FD",
        steps: [
            "找一个安静的地方，采取舒适的坐姿",
            "闭上眼睛，深呼吸三次",
            "将注意力集中在呼吸上",
            "感受空气进入身体，再缓缓呼出",
            "保持均匀的呼吸节奏"
        ],
        tips: "如果走神了，温和地把注意力带回呼吸上",
        videoUrl: "//player.bilibili.com/player.html?aid=271980478&bvid=BV1ic41137C2&cid=11&page=1&high_quality=1",
        backgroundImage: new URL('@/assets/img/relax/huxi.png', import.meta.url).href
    },
    "渐进式肌肉放松": {
        title: "渐进式肌肉放松",
        bgColor: "#F3E5F5",
        steps: [
            "躺下或坐在舒适的位置",
            "从脚趾开始，依次绷紧每个部位的肌肉",
            "保持5-10秒钟",
            "然后完全放松",
            "感受放松后的温暖感觉"
        ],
        tips: "记住：绷紧-保持-放松的节奏",
        videoUrl: "//player.bilibili.com/player.html?isOutside=true&aid=691125558&bvid=BV1d24y1Q7NX&cid=920890426&p=1",
        backgroundImage: new URL('@/assets/img/relax/jirou.png', import.meta.url).href
    },
    // ... 其他训练配置
};

const currentTraining = computed(() => {
    const type = route.params.type as string;
    const config = trainingConfigs[type];
    if (!config) {
        ElMessage({
            message: '训练类型不存在，已切换到默认训练',
            type: 'warning',
            duration: 3000
        });
        return trainingConfigs["呼吸冥想"];
    }

    return config;
});
const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
    // 这里可以添加音频播放/暂停逻辑
};

const goBack = () => {
    router.push('/relaxation');
};

// 更新进度条
const updateProgress = () => {
    if (totalTime.value) {
        progress.value = (currentTime.value / totalTime.value) * 100;
    }
};

const completeTraining = () => {
    dialogVisible.value = true;
};

const handleConfirm = () => {
    if (rating.value === 0) {
        ElMessage.warning('请为本次训练评分');
        return;
    }

    // 打印评分信息到控制台
    console.log('训练评分信息:', {
        训练类型: currentTraining.value.title,
        评分: rating.value,
        评分等级: ['很不满意', '不满意', '一般', '满意', '非常满意'][rating.value - 1],
        用户反馈: feedback.value || '无反馈',
        提交时间: new Date().toLocaleString()
    });

    ElMessage.success('感谢您的反馈！');
    dialogVisible.value = false;
    router.push('/relaxation');
};

const getRatingText = (value: number) => {
    const texts = ['很不满意', '不满意', '一般', '满意', '非常满意'];
    return texts[value - 1] || '';
};

onMounted(() => {
    // 初始化音频播放器等
});
</script>

<template>
    <div class="training-detail" :style="{ backgroundColor: currentTraining.bgColor }">
        <div class="header">
            <el-button style="font-size: 1rem;" @click="goBack" text :icon="Back">
                返回
            </el-button>
            <h1>{{ currentTraining.title }}</h1>
        </div>

        <div class="content">
            <div class="main-section">
                <div class="visual-guide">
                    <iframe :src="currentTraining.videoUrl" scrolling="no" border="0" frameborder="no" framespacing="0"
                        allowfullscreen="true"></iframe>
                </div>
            </div>

            <div class="instructions">
                <h2>训练步骤</h2>
                <ol>
                    <li v-for="(step, index) in currentTraining.steps" :key="index">
                        {{ step }}
                    </li>
                </ol>

                <div class="tips">
                    <h3>小贴士</h3>
                    <p>{{ currentTraining.tips }}</p>
                </div>

                <div class="complete-button-container">
                    <el-button type="primary" class="complete-button" @click="completeTraining">
                        完成训练
                    </el-button>
                </div>

                <!-- 弹窗 -->

            </div>
        </div>

        <!-- 添加评分弹窗 -->
        <el-dialog v-model="dialogVisible" title="训练完成" width="400px" :show-close="false" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <div class="rating-container">
                <p class="rating-title">请为本次训练体验评分</p>
                <div class="rating-stars">
                    <el-rate v-model="rating" size="large" :texts="['很不满意', '不满意', '一般', '满意', '非常满意']" show-text />
                </div>
                <el-input v-model="feedback" type="textarea" :rows="3" placeholder="请输入您的建议（选填）" resize="none"
                    class="feedback-input" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" class="confirm-button" @click="handleConfirm">
                        提交评分
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.training-detail {
    min-height: 100vh;
    padding: 2rem;
    transition: background-color 0.3s ease;

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;

        .back-icon {
            margin-right: 0.5rem;
            color: #2c3e50;
        }

        h1 {
            margin-left: 1rem;
            font-size: 2.2rem;
            color: #2c3e50;
            position: relative;
            padding-left: 0.5em;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 70%;
                background-color: #e8d575;
                border-radius: 2px;
            }
        }
    }

    .content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;

        .main-section {
            .visual-guide {
                position: relative;
                width: 100%;
                height: 100%;
                padding-bottom: 56.25%; // 16:9 的宽高比
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                }
            }
        }

        .instructions {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

            h2 {
                color: #2c3e50;
                margin-bottom: 1.5rem;
                font-size: 1.5rem;
                position: relative;
                padding-left: 1em;

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 70%;
                    background-color: #e8d575;
                    border-radius: 2px;
                }
            }

            ol {
                padding-left: 1.5rem;
                margin-bottom: 2rem;

                li {
                    margin-bottom: 1.2rem;
                    color: #2c3e50;
                    line-height: 1.8;
                    font-size: 1rem;
                    position: relative;
                    padding-left: 0.5em;

                    &::marker {
                        color: #e8d575;
                        font-weight: bold;
                    }

                    &:hover {
                        color: #000;
                    }
                }
            }

            .tips {
                background: #fdfbf2; // 主题色的浅色背景
                padding: 1.8rem;
                border-radius: 12px;
                border-left: 4px solid #e8d575;

                h3 {
                    color: #2c3e50;
                    margin-bottom: 1rem;
                    font-size: 1.4rem;
                }

                p {
                    color: #2c3e50;
                    line-height: 1.8;
                    font-size: 1.1rem;
                }
            }

            .complete-button-container {
                margin-top: 2rem;
                text-align: center;

                .complete-button {
                    width: 80%;
                    height: 3rem;
                    font-size: 1.1rem;
                    background-color: #e8d575;
                    border-color: #e8d575;
                    color: #2c3e50;
                    font-weight: 500;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(232, 213, 117, 0.3);
                        background-color: #f0dd7d;
                        border-color: #f0dd7d;
                    }

                    &:active {
                        transform: translateY(0);
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .training-detail {
        padding: 1rem;

        .content {
            grid-template-columns: 1fr;
        }
    }
}

.rating-container {
    padding: 1rem;
    text-align: center;

    .rating-title {
        font-size: 1.1rem;
        color: #2c3e50;
        margin-bottom: 1.5rem;
    }

    .rating-stars {
        margin-bottom: 1.5rem;
        width: 100%;

        :deep(.el-rate) {
            display: flex;
            justify-content: center;
            gap: 0.5rem;

            .el-rate__icon {
                font-size: 1.5rem;
                color: #e8d575;

                &.hover {
                    // transform: scale(1);
                }
            }

            .el-rate__text {
                font-size: 1rem;
                color: #666;
            }
        }
    }

    .feedback-input {
        margin-top: 1rem;

        :deep(.el-textarea__inner) {
            border-radius: 8px;
            padding: 0.8rem;
            font-size: 1rem;
            resize: none;

            &:focus {
                border-color: #e8d575;
            }
        }
    }
}

.dialog-footer {
    text-align: center;
    margin-top: 1rem;

    .confirm-button {
        width: 50%;
        height: 2.8rem;
        font-size: 1.1rem;
        background-color: #e8d575;
        border-color: #e8d575;
        color: #2c3e50;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(232, 213, 117, 0.3);
            background-color: #f0dd7d;
            border-color: #f0dd7d;
        }

        &:active {
            transform: translateY(0);
        }
    }
}

:deep(.el-dialog) {
    border-radius: 16px;
    overflow: hidden;

    .el-dialog__header {
        margin: 0;
        padding: 1.5rem;
        text-align: center;
        border-bottom: 1px solid #eee;

        .el-dialog__title {
            font-size: 1.3rem;
            color: #2c3e50;
        }
    }

    .el-dialog__body {
        padding: 1.5rem;
    }

    .el-dialog__footer {
        padding: 1rem 1.5rem;
        border-top: 1px solid #eee;
    }
}
</style>
