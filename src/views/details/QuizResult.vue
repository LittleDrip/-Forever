<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getPaperRuslt } from '@/api/quiz';
import { useRoute, useRouter } from "vue-router";
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
    "updatedAt": ""
});

// 获取测试结果
const getResult = async (id: any) => {
    const res = await getPaperRuslt(id);
    result.value = res.data;
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
    padding: 1.5em;

    border-radius: 8px;

    margin-bottom: 1.5em;
}

.result-meta {
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
</style>
