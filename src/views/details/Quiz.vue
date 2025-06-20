<template>
    <div class="app">
        <h1 class="title">测试试卷</h1>
        <div v-if="questions.length > 2" class="questions-container">
            <div v-for="(item, index) in questions" :key="item.id" class="question-item">
                <p class="question-title">
                    {{ index + 1 }} 、{{ item.stContent }}
                </p>
                <!-- 动态加载不同题型的组件 -->
                <SingleChoice v-if="item.questionType === 1" v-model="item.resource" :options="item.options" />
                <!-- <Judgment v-if="item.questionType === 2" v-model="item.resource" :options="item.options" />
                <MultiChoice v-if="item.questionType === 3" v-model="item.resource" :options="item.options" />
                <ShortAnswer v-if="item.questionType === 4" v-model="item.resource" /> -->
                <el-divider />
            </div>

            <el-button color="#e8d575" type="primary" class="submit-button" @click="submitAnswers"
                :disabled="isSubmitting">
                {{ isSubmitting ? '正在提交...' : '立即提交' }}
            </el-button>
        </div>
        <div v-else class="no-questions">
            <el-skeleton :rows="40" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SingleChoice from "@/components/quiz/SingleChoice.vue";
import MultiChoice from "@/components/quiz/MultiChoice.vue";
import Judgment from "@/components/quiz/Judgment.vue";
import ShortAnswer from "@/components/quiz/ShortAnswer.vue";
import { getQuestionsList, submitPaper } from "@/api/quiz";
import { clearAiMemory } from '@/api/history';
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();
const loading = ref(true);
const isSubmitting = ref(false); // 新增的提交状态
const questions = ref([
    {
        id: 1,
        stContent: "多数轿车更换发动机机油的周期里程为________km。",
        questionType: 1,
        stScore: 10,
        resource: "",
        options: ["2000--3000", "5000--8000", "10000--12000", "14000--16000"],
    },

]);
onMounted(() => {

    console.log(route.params.id);
    getQuestionsList(route.params.id).then((res) => {
        const data = res.data;
        // 将后端返回的数据转换为前端所需的数据格式
        const formattedData = data.map(item => {
            return {
                id: item.id,
                stContent: item.stcontent,  // 后端的字段名与前端不一致，需要映射
                questionType: item.questiontype,
                stScore: item.stscore,
                options: JSON.parse(item.options)  // 解析 options 字符串为数组
            };
        });
        // 更新 questions 数据
        questions.value = formattedData;
        loading.value = false;  // 数据加载完成，关闭 loading
    }).catch((error) => {
        loading.value = false;  // 如果请求失败，关闭 loading
        console.error(error);
    });
});



// 清空Ai记录
const clearAiMemoryFunction = async () => {
    await clearAiMemory();
}

const submitAnswers = async () => {
    isSubmitting.value = true;  // 提交开始时，禁用按钮
    await clearAiMemoryFunction();
    // 判断是否所有问题都有答案
    const unansweredQuestions = questions.value.filter(item => !item.resource);

    if (unansweredQuestions.length > 0) {
        ElMessage.warning("请确保所有题目都已作答！"); // 提示用户有未作答的题目
        isSubmitting.value = false; // 恢复按钮状态
        return;
    }
    // 处理用户提交的答案
    const paperId = route.params.id; // 获取试卷ID
    const userAnswer = questions.value.map(item => item.resource);
    // 构建提交的数据对象
    const submitData = {
        paperId: paperId,
        answers: userAnswer
    };
    await submitPaper(submitData);
    ElMessage.success("提交成功，正在跳转到结果页面");
    // 使用 setTimeout 实现延迟跳转，设置延时为 2 秒
    setTimeout(() => {
        router.push({
            path: `/diagnosticTests/${paperId}/result`, // 跳转到测试结果页面
        });
    }, 2000);  // 2 秒后跳转
};
</script>

<style scoped lang="scss">
.app {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;

    .title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
    }

    .questions-container {
        background-color: #fff;
        padding: 2em;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .question-item {
            margin-bottom: 20px;

            .question-title {
                font-size: 1.5em;
                margin-bottom: 10px;
                color: #2c3e50;
                line-height: 1.4;
            }
        }

        .submit-button {
            display: block;
            margin: 6em auto 0 auto;
            width: 12em;
            height: 3em;
        }
    }

    .no-questions {
        text-align: center;
        font-size: 18px;
        color: #666;
    }

    /* 响应式设计 */
    @media screen and (max-width: 1200px) {
        padding: 15px;
        max-width: 90%;

        .questions-container {
            padding: 1.5em;

            .question-item {
                .question-title {
                    font-size: 1.3em;
                }
            }
        }
    }

    // 平板和手机横屏
    @media screen and (max-width: 926px) {
        padding: 12px;
        max-width: 95%;

        .title {
            font-size: 20px;
            margin-bottom: 15px;
        }

        .questions-container {
            padding: 1.2em;

            .question-item {
                margin-bottom: 15px;

                .question-title {
                    font-size: 1.2em;
                    margin-bottom: 8px;
                }
            }

            .submit-button {
                margin-top: 4em;
                width: 10em;
                height: 2.8em;
            }
        }
    }

    // 手机竖屏
    @media screen and (max-width: 768px) {
        padding: 10px;
        max-width: 100%;

        .title {
            font-size: 18px;
            margin-bottom: 12px;
        }

        .questions-container {
            padding: 1em;

            .question-item {
                margin-bottom: 12px;

                .question-title {
                    font-size: 1.1em;
                    line-height: 1.3;
                }
            }

            .submit-button {
                margin-top: 3em;
                width: 9em;
                height: 2.6em;
            }
        }
    }

    // 超小屏幕
    @media screen and (max-width: 480px) {
        padding: 8px;

        .title {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .questions-container {
            padding: 0.8em;

            .question-item {
                margin-bottom: 10px;

                .question-title {
                    font-size: 1em;
                }
            }

            .submit-button {
                margin-top: 2.5em;
                width: 8em;
                height: 2.4em;
            }
        }
    }
}
</style>
