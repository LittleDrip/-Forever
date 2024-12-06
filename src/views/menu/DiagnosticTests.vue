<!-- DiagnosticTest.vue -->
<script lang="ts" setup>
import router from "@/router";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { papersListService, userPapersService } from '@/api/quiz';
const route = useRoute();
// 模拟心理健康测验题库数据
const testBank = ref([
    { id: 1, title: "", description: "", type: "", duration: "" },
]);
const userPapers = ref([
    { paperId: 1 },
]);
// 根据用户试卷表判断用户是否做过该题目。
// 获取题库数据
papersListService().then((res) => {
    testBank.value = res.data;
});
const startTest = (id: number) => {
    router.push({
        path: `/diagnosticTests/${id}`,
    }); // 跳转到指定测试详情页面
};
const searchResult = (id: number) => {
    router.push({
        path: `/diagnosticTests/${id}/result`,
    }); // 跳转到指定测试结果页面
}
// 获取用户做过的试卷数据
const fetchUserPapers = async () => {
    const res = await userPapersService(); // 获取用户的试卷数据
    userPapers.value = res.data; // 假设返回的数据格式为 { user_id, paper_id }
    console.log(userPapers.value);
};
// 判断该试卷是否已做过
const hasTakenTest = (paperId: number) => {
    return userPapers.value.some(userPaper => userPaper.paperId === paperId);
};
// 计算每个试卷是否已做过并显示 "重新测试" 或 "开始测试"
const testStatus = computed(() => {
    return testBank.value.map(test => ({
        ...test,
        hasTaken: hasTakenTest(test.id)
    }));
});
const showCards = computed(() => route.path === "/diagnosticTests");
// 在组件挂载时获取用户试卷数据
onMounted(() => {
    fetchUserPapers();
});
</script>

<template>
    <div class="diagnostic-tests">
        <div class="container">
            <transition name="el-fade-in-linear">
                <RouterView />
            </transition>

            <!-- 遍历题库，生成卡片 -->
            <el-card v-if="showCards" v-for="test in testStatus" :key="test.id" class="test-card" shadow="hover">
                <div v-if="testBank.length > 1">
                    <div class="card-header">
                        <el-tag size="middle" type="primary">{{ test.type }}</el-tag>
                        <h3>{{ test.title }}</h3>
                    </div>
                    <p class="test-description">{{ test.description }}</p>
                    <p class="test-duration">预计时长：{{ test.duration + "分钟" }}+</p>
                    <div class="card-footer">
                        <el-button v-if="test.hasTaken" type="success" size="large" plain
                            @click="searchResult(test.id)">查看结果</el-button>
                        <el-button :type="test.hasTaken ? 'warning' : 'primary'" size="large" plain
                            @click="startTest(test.id)">
                            {{ test.hasTaken ? '重新测试' : '开始测试' }}
                        </el-button>
                    </div>
                </div>
                <div v-else>
                    <el-skeleton animated :rows="20" />
                </div>
            </el-card>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    margin: 20px auto;
    gap: 1.5em;
    padding: 1.5em;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.test-card {
    padding: 1.5em;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
}

.card-header {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.8em;

    h3 {
        margin: 0;
        font-size: 1.4rem;
        color: #333;
    }
}

.test-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
}

.test-duration {
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    margin-top: 0.5em;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
}

.el-button {
    font-size: 0.85rem;
}

.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active {
    transition: opacity 0.1s linear; // 设置过渡效果
}

.el-fade-in-linear-enter-from,
.el-fade-in-linear-leave-to {
    opacity: 0; // 初始状态或消失状态
}
</style>
