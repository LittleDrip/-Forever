<template>
    <div class="news-detail">
        <!-- 案例选择器 -->
        <div class="case-selector">
            <el-select v-model="currentCaseId" placeholder="请选择案例" @change="handleCaseChange">
                <el-option v-for="caseItem in cases" :key="caseItem.id" :label="caseItem.title" :value="caseItem.id" />
            </el-select>
        </div>

        <!-- 案例分析（视频） -->
        <div class="top-left box">
            <h2>{{ currentCase.video.title }}</h2>
            <video controls width="100%" height="240">
                <source :src="videoUrl" type="video/mp4" />
                您的浏览器不支持 video 标签。
            </video>
        </div>

        <!-- 案例详情（文章） -->
        <div class="bottom-left box article">
            <h2 class="title">{{ currentCase.title }}</h2>
            <div v-for="(paragraph, index) in currentCase.content.paragraphs" :key="index" class="paragraph">
                <p v-for="(line, lineIndex) in paragraph.split('\n\n')" :key="lineIndex" class="content-line">
                    {{ line }}
                </p>
            </div>
        </div>

        <!-- 图表展示区域 -->
        <div class="top-right box">
            <div class="chart-header">
                <h2>{{ currentChart === 'pressure' ? '压力源分析' : '人物关系' }}</h2>
                <el-radio-group v-model="currentChart" size="small">
                    <el-radio-button label="pressure">压力源分析</el-radio-button>
                    <el-radio-button label="relation">人物关系</el-radio-button>
                </el-radio-group>
            </div>
            <div v-show="currentChart === 'pressure'" ref="pressureChartRef" class="chart"></div>
            <div v-show="currentChart === 'relation'" ref="relationChartRef" class="chart"></div>
        </div>

        <!-- 时间轴 -->
        <div class="bottom-right box">
            <h2>案发时间轴</h2>
            <el-timeline>
                <el-timeline-item v-for="(item, index) in currentCase.timeline" :key="index" :timestamp="item.timestamp"
                    :type="item.type" placement="top">
                    {{ item.content }}
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import 'element-plus/es/components/timeline/style/css'
import 'element-plus/es/components/timeline-item/style/css'
import 'element-plus/es/components/radio-group/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import caseStudies from '@/data/caseStudies.json'
import { useRoute } from 'vue-router'
import case1Video from '@/assets/video/case1.mp4'

const relationChartRef = ref<HTMLElement | null>(null)
const pressureChartRef = ref<HTMLElement | null>(null)
const currentChart = ref<'relation' | 'pressure'>('pressure')
const currentCaseId = ref('')
let relationChart: echarts.ECharts | null = null
let pressureChart: echarts.ECharts | null = null
const videoUrl = ref('')

const cases = caseStudies.cases
const currentCase = computed(() => cases.find(c => c.id === currentCaseId.value) || cases[0])

// 从路由参数获取案例ID
const route = useRoute()
onMounted(() => {
    currentCaseId.value = route.params.id as string || 'case1'
    videoUrl.value = getVideoUrl(currentCase.value.video.url)
    initPressureChart()
    initRelationChart()

    // 添加窗口大小变化时的自适应
    window.addEventListener('resize', () => {
        if (pressureChart) pressureChart.resize()
        if (relationChart) relationChart.resize()
    })
})

// 获取视频URL
const getVideoUrl = (url: string) => {
    if (url.startsWith('http')) {
        return url
    }
    // 根据案例ID返回对应的视频
    switch (currentCaseId.value) {
        case 'case1':
            return case1Video
        default:
            return url
    }
}

// 初始化压力源分析图
const initPressureChart = () => {
    if (pressureChartRef.value) {
        if (pressureChart) {
            pressureChart.dispose()
        }
        pressureChart = echarts.init(pressureChartRef.value)
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: ['压力指数']
            },
            radar: {
                indicator: currentCase.value.pressureAnalysis.indicators.map(item => ({
                    name: item.name,
                    max: 100
                })),
                radius: '65%',
                center: ['50%', '50%'],
                splitNumber: 4,
                shape: 'circle',
                axisName: {
                    color: '#666',
                    fontSize: 12,
                    padding: [3, 5]
                },
                splitLine: {
                    lineStyle: {
                        color: ['#ddd']
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            series: [{
                name: '压力指数',
                type: 'radar',
                data: [{
                    value: currentCase.value.pressureAnalysis.indicators.map(item => item.value),
                    name: '压力指数',
                    areaStyle: {
                        color: 'rgba(255, 0, 0, 0.2)'
                    },
                    lineStyle: {
                        color: '#ff4d4f',
                        width: 2
                    },
                    itemStyle: {
                        color: '#ff4d4f'
                    }
                }]
            }]
        }
        pressureChart.setOption(option)
    }
}

// 初始化人物关系图
const initRelationChart = () => {
    if (relationChartRef.value) {
        if (relationChart) {
            relationChart.dispose()
        }
        relationChart = echarts.init(relationChartRef.value)
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    if (params.dataType === 'node') {
                        return `${params.name}<br/>角色：${params.data.role}<br/>互动频率：${params.data.frequency}<br/>情感倾向：${params.data.emotion}`
                    } else {
                        return `${params.data.source} → ${params.data.target}<br/>关系类型：${params.data.label}<br/>关系强度：${params.data.strength}<br/>互动方式：${params.data.interaction}`
                    }
                }
            },
            legend: {
                data: ['主要人物', '次要人物'],
                top: 0
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        fontSize: 14,
                        formatter: (params: any) => params.data.name
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        show: true,
                        formatter: (params: any) => params.data.label,
                        fontSize: 12
                    },
                    categories: [
                        { name: '主要人物' },
                        { name: '次要人物' }
                    ],
                    data: currentCase.value.relationshipNetwork.nodes.map(node => ({
                        ...node,
                        symbolSize: node.category === 0 ? 60 : 45,
                        draggable: true,
                        itemStyle: {
                            color: getNodeColor(node.category)
                        }
                    })),
                    links: currentCase.value.relationshipNetwork.links.map(link => ({
                        ...link,
                        lineStyle: {
                            width: getLineWidth(link.strength),
                            color: getLineColor(link.interaction)
                        }
                    })),
                    force: {
                        repulsion: 200,
                        edgeLength: [100, 200],
                        gravity: 0.1
                    },
                    lineStyle: {
                        curveness: 0
                    }
                }
            ]
        }
        relationChart.setOption(option)
    }
}

// 辅助函数
const getNodeColor = (category: number) => {
    const colors = ['#ff4d4f', '#faad14', '#52c41a', '#1890ff', '#722ed1']
    return colors[category % colors.length]
}

const getLineWidth = (strength: string) => {
    const widths: Record<string, number> = {
        '强': 3,
        '中': 2,
        '弱': 1
    }
    return widths[strength] || 2
}

const getLineColor = (interaction: string) => {
    const colors: Record<string, string> = {
        '日常交流': '#faad14',
        '学业指导': '#52c41a',
        '专业咨询': '#1890ff',
        '情感交流': '#722ed1',
        '负面': '#ff4d4f',
        '求助': '#1890ff',
        '支持': '#52c41a'
    }
    return colors[interaction] || '#666'
}

// 处理案例切换
const handleCaseChange = () => {
    videoUrl.value = getVideoUrl(currentCase.value.video.url)
    initPressureChart()
    initRelationChart()
}

// 监听图表切换
watch(currentChart, () => {
    setTimeout(() => {
        if (currentChart.value === 'pressure') {
            initPressureChart()
        } else {
            initRelationChart()
        }
    }, 100)
})

// 监听案例切换
watch(currentCaseId, () => {
    videoUrl.value = getVideoUrl(currentCase.value.video.url)
})

// 组件卸载时清理
onUnmounted(() => {
    if (pressureChart) pressureChart.dispose()
    if (relationChart) relationChart.dispose()
    window.removeEventListener('resize', () => {
        if (pressureChart) pressureChart.resize()
        if (relationChart) relationChart.resize()
    })
})
</script>

<style lang="scss" scoped>
.news-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto minmax(300px, 1fr) minmax(300px, 1fr);
    gap: 24px;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
    background-color: #f5f7fa;

    .case-selector {
        grid-column: 1 / -1;
        grid-row: 1;
        display: flex;
        justify-content: flex-end;
        margin-bottom: -16px;

        :deep(.el-select) {
            width: 200px;
        }
    }

    .box {
        background: #ffffff;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        max-height: 400px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        &:hover {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        h2 {
            font-size: 20px;
            font-weight: 600;
            color: #303133;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #f0f2f5;
            flex-shrink: 0;
        }
    }

    .top-left {
        grid-column: 1;
        grid-row: 2;
        display: flex;
        flex-direction: column;

        video {
            flex: 1;
            min-height: 0;
            border-radius: 8px;
            object-fit: cover;
        }
    }

    .bottom-left {
        grid-column: 1;
        grid-row: 3;

        .title {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            color: #303133;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #f0f2f5;
        }

        .paragraph {
            flex: 1;
            overflow-y: auto;
            padding-right: 8px;
            margin-right: -8px;

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #dcdfe6;
                border-radius: 3px;
            }

            &::-webkit-scrollbar-track {
                background-color: #f5f7fa;
                border-radius: 3px;
            }

            .content-line {
                text-indent: 2em;
                line-height: 1.8;
                margin-bottom: 16px;
                color: #606266;
                font-size: 16px;
                white-space: pre-wrap;
            }
        }
    }

    .top-right {
        grid-column: 2;
        grid-row: 2;

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h2 {
                margin-bottom: 0;
            }
        }

        .chart {
            flex: 1;
            min-height: 0;
            width: 100%;
        }
    }

    .bottom-right {
        grid-column: 2;
        grid-row: 3;

        :deep(.el-timeline) {
            flex: 1;
            overflow-y: auto;
            padding: 0;
            margin: 0;
            padding-right: 8px;
            margin-right: -8px;

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #dcdfe6;
                border-radius: 3px;
            }

            &::-webkit-scrollbar-track {
                background-color: #f5f7fa;
                border-radius: 3px;
            }
        }

        :deep(.el-timeline-item) {
            padding-bottom: 20px;

            &:last-child {
                padding-bottom: 0;
            }

            .el-timeline-item__node {
                width: 12px;
                height: 12px;
            }

            .el-timeline-item__content {
                color: #606266;
                font-size: 15px;
            }

            .el-timeline-item__timestamp {
                color: #909399;
                font-size: 14px;
                font-weight: 500;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .news-detail {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, minmax(300px, 1fr));
        gap: 16px;
        padding: 16px;

        .top-left,
        .bottom-left,
        .top-right,
        .bottom-right {
            grid-column: 1;
        }

        .top-left {
            grid-row: 1;
        }

        .top-right {
            grid-row: 2;
        }

        .bottom-left {
            grid-row: 3;
        }

        .bottom-right {
            grid-row: 4;
        }
    }
}
</style>
