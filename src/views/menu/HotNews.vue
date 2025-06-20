<template>
    <div class="hot-news-container">
        <h1 class="news-title">详细案例</h1>

        <div class="news-list">
            <div v-for="(news, index) in newsList" :key="index" class="news-card" @click="goToDetail(news.id)">
                <div class="dot" v-if="index === 0"></div>

                <div class="news-content">
                    <h2 class="news-headline">{{ news.title }}</h2>

                    <div class="tags-container">
                        <span class="tag location">{{ news.location }}</span>
                        <span class="tag age">{{ news.age }}</span>
                        <span class="tag category">{{ news.category }}</span>
                    </div>

                    <p class="news-description">{{ news.description }}</p>

                    <div class="video-section">
                        <h3>心理评估</h3>
                        <p>{{ news.PsyEva }}</p>
                    </div>
                </div>

                <div class="image-preview">
                    <el-image :src="`/src/assets/img/news/${news.id}.png`" class="case-image"></el-image>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import caseStudies from '@/data/caseStudies.json';

const router = useRouter();

interface NewsItem {
    id: string;
    title: string;
    image: string,
    location: string;
    age: string;
    category: string;
    description: string;
    PsyEva: string;
}

const newsList = ref<NewsItem[]>([
    {
        id: 'case3',
        title: '四川成都15岁少女KTV陪酒后坠楼事件（2023年）',
        "image": '',
        location: '四川成都',
        age: '15岁少女',
        category: '抑郁症',
        description: '一名15岁少女因陪酒后从商场三楼坠落，导致多处粉碎性骨折伴出血、失血性休克等。丹丹在KTV陪酒过程中大量饮酒，事发前曾因穿着问题与KTV负责人发生争执，感到委屈。经医院检查，丹丹被诊断为抑郁症。',
        PsyEva: '心理专家对丹丹进行了评估，发现其在事发前存在明显的焦虑和抑郁情绪。陪酒过程中饮酒过量和与KTV负责人的争执进一步加剧了其心理创伤，导致其情绪失控。目前，丹丹正在接受心理治疗，包括认知行为疗法和药物治疗。'
    },
    {
        id: 'case2',
        title: '广东深圳16岁高中生坠亡事件（2022年）',
        "image": '',
        location: '广东深圳',
        age: '16岁高中生',
        category: '抑郁症',
        description: '一名16岁女高中生因抑郁症从学校教学楼坠亡。家属质疑学校心理干预不到位，事件引发广泛讨论。',
        PsyEva: '该学生在生前曾被诊断为抑郁症，但学校未能及时发现其病情的严重性。心理专家指出，学校和家庭在心理干预方面存在不足，未能给予其足够的关注和支持。'
    },
    {
        id: 'case0',
        title: '玩“死亡游戏”的少年',
        "image": '',
        location: '江苏常熟',
        age: '19岁少年',
        category: '抑郁症',
        description: '2017年，江苏常熟19岁少年小姚参与"蓝鲸死亡游戏"，该游戏通过社交平台诱导青少年自残自杀。游戏要求玩家50天内完成凌晨起床、听悲伤音乐、看恐怖电影、自残等任务，并拍照接受监督。玩家若退出，其隐私信息会被公开，家人受威胁。',
        PsyEva: '小姚参与原因：家庭不幸福，父母离异，缺少朋友和沟通；自身有自杀倾向。青少年好奇心强，辨别能力弱，易受网络不良信息诱导。社交平台监管漏洞也为危险游戏传播提供了机会。'
    },
    {
        id: 'case1',
        title: '四川成都：捅伤父亲杀死奶奶，十八岁少年行凶后跳楼',
        "image": '',
        location: '四川成都',
        age: '18岁少年',
        category: '抑郁症',
        description: '2014年8月27日晚,四川巴中市18岁少年张文在家中举办"升学宴"庆祝"考上大学"时,因父亲要求查看录取通知书而谎言败露,情绪失控持刀捅伤父亲(颈部重伤),并杀害劝架的奶奶,随后从5楼跳楼身亡',
        PsyEva: '该少年存在严重适应障碍伴病理性撒谎（虚构成就逃避现实），长期情感压抑导致偏执型崩溃；家庭功能失调（情感忽视+高压期待）加剧其社交孤立与自我否定，最终在羞耻感冲击下触发解离性攻击行为，属典型的青少年抑郁型危机爆发案例'
    },


]);

const goToDetail = (caseId: string) => {
    router.push({
        name: 'NewsDetail',
        params: { id: caseId }
    });
};
</script>

<style lang="scss" scoped>
.hot-news-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.news-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.news-card {
    display: flex;
    align-items: flex-start;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    gap: 20px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

.dot {
    position: absolute;
    left: -30px;
    top: 25px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #5c6bc0;
}

.news-content {
    flex: 1;
}

.news-headline {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
}

.tags-container {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}

.tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    color: #fff;
}

.location {
    background-color: #ffcdd2;
    color: #c62828;
}

.age {
    background-color: #fff9c4;
    color: #f57f17;
}

.category {
    background-color: #e8eaf6;
    color: #3949ab;
}

.news-description {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #333;
}

.video-section {
    background-color: #f0f4f8;
    padding: 15px;
    border-radius: 6px;

    h3 {
        font-size: 16px;
        margin-bottom: 8px;
        color: #333;
    }

    p {
        font-size: 14px;
        line-height: 1.5;
        color: #555;
    }
}

.image-preview {
    width: 250px;
    height: 220px;
    flex-shrink: 0;
    overflow: hidden;
}

.case-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
}
</style>