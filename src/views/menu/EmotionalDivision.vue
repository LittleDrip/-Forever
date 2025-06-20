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
                        <div class="recommend-container" v-if="result.level === 'level5'">
                            <el-tag type="success" class="recommend-tag">推荐使用</el-tag>
                            <el-tooltip content="这是根据您的测试结果智能推荐的模块" placement="top">
                                <el-icon class="question-icon">
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </div>
                </div>

                <!-- 中度 -->
                <div class="division-item moderate" @click="navigateTo('/HeartAssistant')">
                    <div class="division-content">
                        <img src="@/assets/img/division/Moderate.png" alt="中度" class="division-image">
                        <h2 class="division-title">中度</h2>
                        <p>明显的情绪变化，需要关注</p>
                        <div class="recommend-container"
                            v-if="result.level === 'level3' || result.level === 'level4' || result.level === 'level2'">
                            <el-tag type="warning" class="recommend-tag">推荐使用</el-tag>
                            <el-tooltip content="这是根据您的测试结果智能推荐的模块" placement="top">
                                <el-icon class="question-icon">
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </div>
                </div>

                <!-- 重度 -->
                <div class="division-item severe" @click="navigateTo('/IntelligentNavigation')">
                    <div class="division-content">
                        <img src="@/assets/img/division/Severe.png" alt="重度" class="division-image">
                        <h2 class="division-title">重度</h2>
                        <p>强烈的情绪波动，需要及时干预</p>
                        <div class="recommend-container" v-if="result.level === 'level1'">
                            <el-tag type="danger" class="recommend-tag">推荐使用</el-tag>
                            <el-tooltip content="这是根据您的测试结果智能推荐的模块" placement="top">
                                <el-icon class="question-icon">
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getPaperRuslt } from "@/api/quiz";
import { ref, onMounted } from 'vue';
import { QuestionFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 获取测试结果
const result = ref({
    "level": ""
});
const results = ref<any[]>([]);
const finalResult = ref({ level: "" });

const getResult = async (id: number) => {
    const res = await getPaperRuslt(id);
    return res.data;
};

const calculateAverageLevel = (validResults: any[]) => {
    if (validResults.length === 0) {
        ElMessage.error("你尚未开始作答任何试卷");
        return { level: "" };
    }

    // 将level转换为数字进行比较
    const levelMap: { [key: string]: number } = {
        'level1': 1,
        'level2': 2,
        'level3': 3,
        'level4': 4,
        'level5': 5
    };

    // 找到最严重的level（数字最小的）
    const minLevel = Math.min(...validResults.map(result => levelMap[result.level]));

    // 将数字转回level字符串
    return { level: `level${minLevel}` };
};

onMounted(async () => {
    // 获取所有测试结果
    for (let i = 1; i <= 3; i++) {
        const result = await getResult(i);
        if (result !== '404') {
            results.value.push(result);
        }
    }

    // 计算平均level
    finalResult.value = calculateAverageLevel(results.value);
    result.value = finalResult.value; // 更新原来的result引用
});

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

.recommend-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
    height: 32px;
}

.recommend-tag {
    margin: 0;
    height: 32px;
    line-height: 32px;
    display: inline-flex;
    align-items: center;
}

.question-icon {
    color: #909399;
    cursor: help;
    font-size: 16px;
    display: flex;
    align-items: center;

    &:hover {
        color: #409EFF;
    }
}
</style>
