<script lang="ts" setup>
import { getArticleById, getArticleSummary } from '@/api/article';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Markdown from 'vue3-markdown-it';

import Comment from '@/components/comment/Comment.vue';
import router from '@/router';
const isLoading = ref(false);
const route = useRoute();
const post = ref({
    title: "",
    content: "",
    createTime: "",
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

const showSummary = ref(false);
const summary = ref("");

const fetchSummary = async () => {
    if (articleId) {
        isLoading.value = true;
        try {
            const res = await getArticleSummary(articleId);
            summary.value = res.data;
            showSummary.value = true;
        } catch (error) {
            console.error('获取总结失败:', error);
        } finally {
            isLoading.value = false;
        }
    }
};
const goBack = () => {
    router.back();
};

onMounted(() => {
    console.log(articleId); // 检查获取的值
    if (articleId) {
        getArticle(articleId);
    }
})
</script>

<template>
    <div class="back-button" @click="goBack">
        <svg t="1710747179070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4250" width="32" height="32">
            <path
                d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.052938-18.416442-49.91597-18.416442-68.968908 0L291.910961 480.275316c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.439172 345.70441c19.052938 18.416442 49.91597 18.416442 68.968908 0 19.052938-18.416442 19.052938-48.273447 0-66.660212L395.21518 513.604544z"
                p-id="4251"></path>
        </svg>
        返回
    </div>
    <div class="container">
        <!-- 左侧内容 -->
        <div class="content">
            <div class="summary-button">
                <el-button type="primary" @click="fetchSummary" :loading="isLoading">
                    {{ isLoading ? '正在生成' : '智能总结' }}
                </el-button>
            </div>
            <el-skeleton :rows="50" animated v-if="!post.title" />

            <div v-else>

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
        <!-- 右侧总结区域 -->
        <div class="summary-sidebar" v-if="showSummary || isLoading">
            <div class="summary-content">
                <h2>文章智能总结</h2>
                <el-skeleton :rows="10" animated v-if="isLoading" />
                <Markdown v-else class="summary-text" :source="summary" :breaks="true" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.back-button {
    display: flex;
    align-items: center;
    position: absolute;
    gap: 5px;
    font-size: 1.2rem;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    margin-bottom: 15px;
    color: #666;
    transition: all 0.3s ease;

    &:hover {
        color: #E8D575;
        transform: translateX(-5px);
    }

    svg {
        width: 24px;
        height: 24px;
    }
}

.container {
    display: flex;
    max-width: 85%;
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
    position: relative;
}

.summary-sidebar {
    flex: 1;
    position: sticky;
    top: 20px;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
}

.summary-content {
    background-color: #ffffff;
    padding: 1.5em;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 1em;
        padding-bottom: 0.5em;
        border-bottom: 1px solid #eee;
    }
}

.summary-text {
    font-size: 0.95rem;
    line-height: 1.8;
    color: #444;

    p {
        margin-bottom: 1em;
    }
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

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1em 0;
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

.summary-button {
    position: absolute;
    top: 1em;
    right: 1em;
}

.summary-card {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
    .container {
        max-width: 85%;
        padding: 1.2em;
    }

    .content {
        padding: 1.2em;
    }

    .title {
        font-size: 1.6rem;
    }

    .rich-text {
        font-size: 0.95rem;
    }
}

// 平板和手机横屏
@media screen and (max-width: 926px) {
    .container {
        max-width: 95%;
        padding: 1em;
    }

    .content {
        padding: 1em;

        .title {
            font-size: 1.4rem;
        }

        .meta {
            font-size: 0.85rem;
        }

        .rich-text {
            font-size: 0.9rem;
            line-height: 1.6;

            img {
                margin: 0.8em 0;
            }
        }

        .stats {
            font-size: 0.85rem;
        }
    }
}

// 手机竖屏
@media screen and (max-width: 768px) {
    .container {
        max-width: 100%;
        padding: 0.8em;
    }

    .content {
        padding: 0.8em;

        .title {
            font-size: 1.3rem;
            margin-bottom: 0.4em;
        }

        .meta {
            font-size: 0.8rem;
            margin-bottom: 1em;
        }

        .rich-text {
            font-size: 0.85rem;
            line-height: 1.5;

            p {
                margin-bottom: 0.8em;
            }
        }

        .stats {
            margin-top: 1.5em;
            font-size: 0.8rem;
        }
    }
}

// 超小屏幕
@media screen and (max-width: 480px) {
    .container {
        padding: 0.5em;
    }

    .content {
        padding: 0.6em;

        .title {
            font-size: 1.2rem;
        }

        .meta {
            font-size: 0.75rem;
        }

        .rich-text {
            font-size: 0.8rem;

            img {
                margin: 0.5em 0;
            }
        }

        .stats {
            margin-top: 1.2em;
        }
    }
}
</style>