<template>
    <div class="story-detail-container">
        <div class="story-header">
            <div class="back-button" @click="goBack">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
                返回列表
            </div>
            <div class="title-container">
                <h1 class="story-title">{{ story.title }}</h1>
                <span v-if="story.is_top" class="top-tag">置顶</span>
            </div>
            <div class="meta">
                <span v-if="story.type" class="type-tag">{{ story.type }}</span>
            </div>
        </div>

        <div class="story-content" v-html="story.content"></div>


    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getStoryDetail } from '@/api/story';
import Comment from '@/components/comment/Comment.vue';

const route = useRoute();
const router = useRouter();
const storyId = route.params.id;

interface Story {
    id: number;
    title: string;
    content: string;
    is_top: boolean;
    type: string | null;
    createTime?: string | Date;
}

const story = ref<Story>({
    id: 0,
    title: '',
    content: '',
    is_top: false,
    type: null,
    createTime: undefined
});

const fetchStoryDetail = async () => {
    if (!storyId) return;

    try {
        const res = await getStoryDetail(Number(storyId));
        story.value = res.data;
    } catch (error) {
        console.error('获取故事详情失败:', error);
        ElMessage.error('获取故事详情失败');
    }
};

const formatDate = (date: string | Date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const goBack = () => {
    router.push('/story');
};

onMounted(() => {
    fetchStoryDetail();
});
</script>

<style scoped>
.story-detail-container {
    max-width: 70%;
    margin: 0 auto;
    padding: 2em;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
}

.story-header {
    margin-bottom: 2em;
    border-bottom: 1px solid #eee;
    padding-bottom: 1em;
    position: relative;
}

.back-button {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.back-button:hover {
    background-color: #f5f5f5;
    color: #333;
}

.title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 1.5em 0 0.5em;
}

.top-tag {
    background-color: #e8d9a3;
    color: #333;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
}

.story-title {
    font-size: 2em;
    color: #333;
    margin: 0;
    text-align: center;
}

.meta {
    display: flex;
    justify-content: center;
    gap: 1em;
    color: #666;
    font-size: 0.9em;
    margin-bottom: 1em;
}

.type-tag {
    background-color: #e8d9a3;
    padding: 2px 10px;
    border-radius: 12px;
    color: #333;
}

.story-content {
    font-size: 1.6em;
    line-height: 1.8;
    color: #444;
    padding: 0 2em;
    margin-bottom: 3em;
}

/* 添加富文本内容中图片的样式 */
.story-content :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5em auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 添加段落样式 */
.story-content :deep(p) {
    margin: 1em 0;
    text-align: justify;
}

/* 添加标题样式 */
.story-content :deep(h1),
.story-content :deep(h2),
.story-content :deep(h3),
.story-content :deep(h4),
.story-content :deep(h5),
.story-content :deep(h6) {
    margin: 1.5em 0 0.8em;
    color: #333;
    font-weight: bold;
}

/* 添加列表样式 */
.story-content :deep(ul),
.story-content :deep(ol) {
    padding-left: 2em;
    margin: 1em 0;
}

/* 添加链接样式 */
.story-content :deep(a) {
    color: #e8d9a3;
    text-decoration: none;
    transition: color 0.3s ease;
}

.story-content :deep(a:hover) {
    color: #d6c88f;
    text-decoration: underline;
}

/* 添加表格样式 */
.story-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
}

.story-content :deep(th),
.story-content :deep(td) {
    border: 1px solid #eee;
    padding: 0.5em;
    text-align: left;
}

.story-content :deep(th) {
    background-color: #f5f5f5;
}

/* 添加引用样式 */
.story-content :deep(blockquote) {
    margin: 1em 0;
    padding: 1em;
    border-left: 4px solid #e8d9a3;
    background-color: #f9f9f9;
    font-style: italic;
}

/* 添加代码块样式 */
.story-content :deep(pre),
.story-content :deep(code) {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
}

.story-content :deep(pre) {
    padding: 1em;
    overflow-x: auto;
}

/* 响应式图片处理 */
@media (max-width: 768px) {
    .story-content :deep(img) {
        width: 100%;
        margin: 1em 0;
    }

    .story-content {
        font-size: 1.2em;
        padding: 0 1em;
    }
}

.comment-section {
    margin-top: 3em;
    padding: 0 2em;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .story-detail-container {
        max-width: 95%;
        padding: 1em;
    }

    .story-title {
        font-size: 1.5em;
    }

    .title-container {
        flex-direction: column;
        gap: 8px;
    }

    .top-tag {
        padding: 2px 8px;
        font-size: 12px;
    }

    .story-content {
        padding: 0 1em;
    }

    .comment-section {
        padding: 0 1em;
    }
}
</style>
