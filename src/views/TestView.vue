<template>
    <div class="app">
        <h1 class="title">测试试卷</h1>
        <div v-if="questions.length > 0" class="questions-container">
            <div v-for="(item, index) in questions" :key="item.id" class="question-item">
                <p class="question-title">
                    第 {{ index + 1 }} 题: {{ item.stContent }} <span>（{{ item.stScore }}分）</span>
                </p>
                <!-- 动态加载不同题型的组件 -->
                <SingleChoice v-if="item.questionType === 1" v-model="item.resource" :options="item.options" />
                <Judgment v-if="item.questionType === 2" v-model="item.resource" :options="item.options" />
                <MultiChoice v-if="item.questionType === 3" v-model="item.resource" :options="item.options" />
                <ShortAnswer v-if="item.questionType === 4" v-model="item.resource" />
            </div>
            <button class="submit-button" @click="submitAnswers">提交</button>
        </div>
        <div v-else class="no-questions">
            <p>暂无试题</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import SingleChoice from "@/components/quiz/SingleChoice.vue";
import MultiChoice from "@/components/quiz/MultiChoice.vue";
import Judgment from "@/components/quiz/Judgment.vue";
import ShortAnswer from "@/components/quiz/ShortAnswer.vue";

const questions = ref([
    {
        id: 1,
        stContent: "多数轿车更换发动机机油的周期里程为________km。",
        questionType: 1,
        stScore: 10,
        resource: "",
        options: ["2000--3000", "5000--8000", "10000--12000", "14000--16000"],
    },
    {
        id: 2,
        stContent: "太阳从西边升起。",
        questionType: 2,
        stScore: 5,
        resource: "",
        options: ["对", "错"],
    },

    {
        id: 4,
        stContent: "请简述Vue 3的主要特性。",
        questionType: 4,
        stScore: 20,
        resource: "",
    },
]);

const submitAnswers = () => {
    console.log("用户提交的答案:", questions.value.map((q) => q.resource));
};
</script>

<style scoped lang="scss">
.app {
    padding: 20px;

    .title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
    }

    .questions-container {
        .question-item {
            margin-bottom: 20px;

            .question-title {
                font-weight: 700;
                margin-bottom: 10px;
            }
        }

        .submit-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #409eff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }

    .no-questions {
        text-align: center;
        font-size: 18px;
        color: #666;
    }
}
</style>
