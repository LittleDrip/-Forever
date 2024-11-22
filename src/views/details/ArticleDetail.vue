<script lang="ts" setup>
import { getArticleById } from '@/api/article';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Comment from '@/components/comment/Comment.vue';

const route = useRoute();
const post = ref({
    title: "心理健康的重要性",
    content: "",
    createTime: "2024-11-01 10:30:00",
    userId: 1,
    type: "1",
    commentCount: 5,
    likeCount: 23,
    readCount: 150,
    collectCount: 10,
});
const getArticle = async (id) => {
    const res = await getArticleById(id);
    post.value = res.data;
    console.log(post.value)
}
const articleId = route.query.id; // 从查询字符串中获取文章 ID

onMounted(() => {
    console.log(articleId); // 检查获取的值
    if (articleId) {
        getArticle(articleId);
    }
})
</script>

<template>
    <div class="container">
        <!-- 左侧内容 -->
        <div class="content">
            <h1 class="title">{{ post.title }}</h1>
            <p class="meta">
                发布于 {{ post.createTime }} · 阅读 {{ post.readCount }} 次 · 点赞 {{ post.likeCount }} 次
            </p>
            <div class="rich-text" v-html="post.content"></div>
            <div class="stats">
                <p>评论数：{{ post.commentCount }}</p>
                <p>收藏数：{{ post.collectCount }}</p>
            </div>
            <div class="comment">
                <Comment v-if="articleId" :articleId="articleId"></Comment>
                <!-- <Comment :articleId="route.query.id"></Comment> -->
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    max-width: 70%;

    margin: 0 auto;
    padding: 1.5em;
    gap: 1.5em;
}

.content {
    flex: 2.2;
    background-color: #ffffff;
    padding: 1.5em;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5em;
    color: #333;
}

.meta {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.2em;
}

.rich-text {
    font-size: 1rem;

    line-height: 1.8;
    color: #444;

    p {
        margin-bottom: 1em;
    }

    strong {
        color: #000;
    }
}

.stats {
    margin-top: 2em;
    font-size: 0.9rem;
    color: #555;

    p {
        margin: 0.5em 0;
    }
}
</style>
