<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Timer, VideoPlay, VideoPause, Back, Plus } from '@element-plus/icons-vue';
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

// 添加打卡记录相关的变量
const recordDialogVisible = ref(false);
const resultDialogVisible = ref(false);
const recordImages = ref<File[]>([]);
const recordVideo = ref<File | null>(null);
const recordVideoUrl = ref(''); // 添加视频预览URL
const recordDescription = ref('');

// 添加打卡结果数据
const recordResult = ref({
    score: 0,
    duration: '',
    squatCount: 0,
    analysis: '',
    suggestions: [] as string[]
});

// 训练内容配置



const completeTraining = () => {
    dialogVisible.value = true;
};




const calculateScore = (squatCount: number, duration: string) => {
    // 解析时长字符串 "0:00:05" 为秒数
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // 计算每分钟深蹲次数
    const squatsPerMinute = squatCount / (totalSeconds / 60);

    // 根据每分钟深蹲次数评分
    if (squatsPerMinute >= 10) {
        return 95;
    } else if (squatsPerMinute >= 8) {
        return 85;
    } else if (squatsPerMinute >= 6) {
        return 75;
    } else if (squatsPerMinute >= 4) {
        return 65;
    } else {
        return 55;
    }
};





onMounted(() => {
    // 初始化音频播放器等
});
</script>

<template>
    <div class="training-detail">




        <!-- 添加打卡结果弹窗 -->
        <el-dialog v-model="resultDialogVisible" title="打卡结果" width="600px" :show-close="false"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="result-container">
                <div class="score-section">
                    <div class="score-circle">
                        <span class="score">{{ recordResult.score }}</span>
                        <span class="score-label">分</span>
                    </div>
                    <div class="score-info">
                        <div class="info-item">
                            <span class="label">训练时长</span>
                            <span class="value">{{ recordResult.duration }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">深蹲次数</span>
                            <span class="value">{{ recordResult.squatCount }}次</span>
                        </div>
                    </div>
                </div>

                <div class="analysis-section">
                    <h3>分析结果</h3>
                    <p>{{ recordResult.analysis }}</p>
                </div>

                <div class="suggestions-section">
                    <h3>训练建议</h3>
                    <ul>
                        <li v-for="(suggestion, index) in recordResult.suggestions" :key="index">
                            {{ suggestion }}
                        </li>
                    </ul>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="resultDialogVisible = false; router.push('/relaxation')">
                        完成
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
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .complete-button,
                .record-button {
                    width: 80%;
                    height: 3rem;
                    font-size: 1.1rem;
                    font-weight: 500;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }

                    &:active {
                        transform: translateY(0);
                    }
                }

                .complete-button {
                    background-color: #e8d575;
                    border-color: #e8d575;
                    color: #2c3e50;

                    &:hover {
                        background-color: #f0dd7d;
                        border-color: #f0dd7d;
                    }
                }

                .record-button {
                    background-color: #67c23a;
                    border-color: #67c23a;
                    color: white;

                    &:hover {
                        background-color: #85ce61;
                        border-color: #85ce61;
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

// 手机横屏特定样式
@media screen and (max-height: 500px) and (orientation: landscape) {
    .training-detail {
        padding: 0.8rem;

        .header {
            margin-bottom: 1rem;

            h1 {
                font-size: 1.5rem;
            }
        }

        .content {
            grid-template-columns: 3fr 2fr;
            gap: 1rem;

            .main-section {
                .visual-guide {
                    padding-bottom: 40%; // 调整视频区域高度
                }
            }

            .instructions {
                padding: 1rem;

                h2 {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }

                ol {
                    margin-bottom: 1rem;

                    li {
                        margin-bottom: 0.8rem;
                        font-size: 0.9rem;
                        line-height: 1.5;
                    }
                }

                .tips {
                    padding: 1rem;

                    h3 {
                        font-size: 1.1rem;
                        margin-bottom: 0.5rem;
                    }

                    p {
                        font-size: 0.9rem;
                        line-height: 1.5;
                    }
                }

                .complete-button-container {
                    margin-top: 1rem;

                    .complete-button {
                        height: 2.5rem;
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    // 评分弹窗的横屏适配
    .rating-container {
        padding: 0.8rem;

        .rating-title {
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        .rating-stars {
            margin-bottom: 1rem;

            :deep(.el-rate) {
                .el-rate__icon {
                    font-size: 1.2rem;
                }

                .el-rate__text {
                    font-size: 0.9rem;
                }
            }
        }

        .feedback-input {
            margin-top: 0.8rem;
        }
    }

    :deep(.el-dialog) {
        .el-dialog__header {
            padding: 1rem;

            .el-dialog__title {
                font-size: 1.1rem;
            }
        }

        .el-dialog__body {
            padding: 1rem;
        }

        .el-dialog__footer {
            padding: 0.8rem;
        }

        .dialog-footer {
            .confirm-button {
                height: 2.4rem;
                font-size: 1rem;
            }
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

.record-container {
    padding: 1rem;

    .upload-section {
        margin-bottom: 2rem;

        h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .preview-video {
            width: 100%;
            max-height: 300px;
            margin-top: 1rem;
            border-radius: 8px;
        }
    }

    .description-section {
        h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
}

.result-container {
    padding: 1rem;

    .score-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;

        .score-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #e8d575, #f0dd7d);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(232, 213, 117, 0.3);

            .score {
                font-size: 2.5rem;
                font-weight: bold;
                color: #2c3e50;
            }

            .score-label {
                font-size: 1rem;
                color: #2c3e50;
            }
        }

        .score-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .info-item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .label {
                    font-size: 0.9rem;
                    color: #666;
                }

                .value {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #2c3e50;
                }
            }
        }
    }

    .analysis-section,
    .suggestions-section {
        margin-bottom: 2rem;

        h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
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

        p {
            color: #2c3e50;
            line-height: 1.8;
        }
    }

    .suggestions-section {
        ul {
            list-style: none;
            padding-left: 0;

            li {
                position: relative;
                padding-left: 1.5em;
                margin-bottom: 0.8rem;
                color: #2c3e50;
                line-height: 1.6;

                &::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: #e8d575;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
