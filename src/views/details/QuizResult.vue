<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import { getPaperRuslt } from '@/api/quiz';
import { useRoute, useRouter } from "vue-router";
import * as echarts from 'echarts';

const route = useRoute();
const router = useRouter();
const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr); // 解析 ISO 格式的时间字符串
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（0-11），所以加1并格式化
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}
const result = ref({
    "evaluation": "", // html富文本
    "createdAt": "",
    "updatedAt": "",
    "level": ""
});

// 获取测试结果
const getResult = async (id: any) => {
    const res = await getPaperRuslt(id);
    result.value = res.data;
};

// 定义雷达图的配置生成函数
const getRadarOption = (level: string) => {
    // 获取数字等级
    const levelNum = parseInt(level.replace('level', ''));

    // 根据level定义不同的颜色方案
    const colorSchemes: Record<string, string[]> = {
        'level1': ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.8)'], // 红色系
        'level2': ['rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 0.8)'], // 橙色系
        'level3': ['rgba(255, 205, 86, 0.2)', 'rgba(255, 205, 86, 0.8)'], // 黄色系
        'level4': ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.8)'], // 青色系
        'level5': ['rgba(124, 215, 184, 0.2)', 'rgba(84, 184, 153, 0.8)']  // 绿色系
    };

    // 根据level生成不同的数据
    const generateData = (level: string) => {
        const baseValues: Record<string, number[]> = {
            'level1': [30, 25, 20, 35, 30, 25],
            'level2': [45, 40, 35, 50, 45, 40],
            'level3': [65, 60, 55, 70, 65, 60],
            'level4': [85, 80, 75, 90, 85, 80],
            'level5': [95, 90, 85, 100, 95, 90]
        };
        return baseValues[level] || baseValues['level1']; // 默认返回 level1 的数据
    };

    return {

        radar: {
            indicator: [
                { text: '情绪管理', max: 100 },
                { text: '人际关系', max: 100 },
                { text: '压力应对', max: 100 },
                { text: '自我认知', max: 100 },
                { text: '生活适应', max: 100 },
                { text: '心理韧性', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: 120,
            axisName: {
                color: '#666',
                backgroundColor: '#fff',
                borderRadius: 3,
                padding: [3, 5]
            },
            splitArea: {
                areaStyle: {
                    color: ['#fff']
                }
            }
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: generateData(level),
                        name: '当前水平',
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                                {
                                    color: colorSchemes[level]?.[0] || colorSchemes['level1'][0],
                                    offset: 0
                                },
                                {
                                    color: colorSchemes[level]?.[1] || colorSchemes['level1'][1],
                                    offset: 1
                                }
                            ])
                        },
                        lineStyle: {
                            width: 1
                        }
                    }
                ]
            }
        ]
    };
};

// 初始化图表
const initChart = () => {
    const chartDom = document.getElementById('radarChart');
    if (chartDom) {
        const myChart = echarts.init(chartDom);
        myChart.setOption(getRadarOption(result.value.level));
    }
};

// 页面加载后获取测试结果
onMounted(async () => {
    await getResult(route.params.id);
    if (result.value.createdAt) {
        result.value.createdAt = formatDate(result.value.createdAt);
    }
    if (result.value.updatedAt) {
        result.value.updatedAt = formatDate(result.value.updatedAt);
    }
    // 等待 DOM 更新后初始化图表
    nextTick(() => {
        initChart();
    });
});

// 返回首页
const goBack = () => {
    router.push("/diagnosticTests").then(() => {
        window.location.reload();
    }); // 跳转到测试列表页面

};
</script>

<template>
    <div class="result-container">
        <div class="result-header">
            <h1>测试结果</h1>
            <p class="subheading">您的心理健康测试已完成！</p>
        </div>

        <!-- 显示测试结果 -->
        <div v-if="result && result.evaluation" class="result-content">
            <div class="evaluation" v-html="result.evaluation"></div>
            <!-- 雷达图移到这里 -->
            <div class="chart-container">
                <h2 class="chart-title">心理健康维度分析</h2>
                <div id="radarChart" class="radar-chart"></div>
            </div>
            <div class="result-meta">
                <p><strong>初次测试时间:</strong> {{ result.createdAt }}</p>
                <p><strong>上次测试时间:</strong> {{ result.updatedAt }}</p>
            </div>


        </div>

        <!-- 加载状态 -->
        <div v-else class="loading">
            <el-skeleton :rows="40" />
        </div>

        <!-- 返回按钮 -->
        <div class="action-buttons">
            <el-button type="primary" size="medium" @click="goBack">返回首页</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    max-width: 800px;
    margin: 0 auto;

    border-radius: 10px;

}

.result-header {
    text-align: center;
    margin-bottom: 2em;
}

h1 {
    font-size: 2.2rem;
    color: #333;
}

.subheading {
    margin-top: 1em;
    font-size: 1.1rem;
    color: #666;
}

.result-content {
    margin-bottom: 2em;
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
}

.evaluation {
    background-color: #fff;
    padding: 1.5em;
    border-radius: 8px;

}

.result-meta {
    margin-top: 1em;
    font-size: 0.9rem;
    color: #777;
}

.result-meta p {
    margin: 0.5em 0;
}

.loading {
    font-size: 1.2rem;
    color: #999;
    text-align: center;
    padding: 2em;
}

.action-buttons {
    display: flex;
    justify-content: center;
    margin-top: 1.5em;
}

.el-button {
    font-size: 1rem;
    padding: 0.8em 2em;
    background-color: #409eff;
    color: #fff;
    border-radius: 5px;
}

.el-button:hover {
    background-color: #66b1ff;
}

.el-spinner {
    margin-right: 1em;
}

/* 添加雷达图样式 */
.radar-chart {
    width: 100%;
    height: 400px;
    margin: 20px 0;
}

.chart-container {
    margin-top: 0;
    padding: 1.5em;
    border-radius: 8px;
    width: 100%;
    position: relative;

    .chart-title {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 1.2rem;
        color: #666;
        margin: 0;
        padding: 8px 12px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 4px;
        z-index: 1;
    }

    .radar-chart {
        width: 100%;
        height: 400px;
        margin: 0;
    }
}
</style>
