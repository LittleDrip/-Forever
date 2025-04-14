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
    <div class="story-share-container">

        <div class="categories">
            <button v-for="category in categories" :key="category" :class="{ active: selectedCategory === category }"
                @click="selectCategory(category)" class="category-button">
                {{ category }}
            </button>
        </div>

        <div class="story-list">
            <div v-for="story in filteredStories" :key="story.id" class="story-card" @click="goToDetail(story.id)">
                <div class="story-card-indicator"></div>
                <div class="story-card-content">
                    <div class="story-header">
                        <h3 class="story-title">{{ story.title }}</h3>
                        <span v-if="story.isTop" class="top-tag">置顶</span>
                    </div>
                    <p class="story-snippet" v-html="truncateContent(story.content)"></p>
                </div>
            </div>
            <div v-if="filteredStories.length === 0" class="no-stories">
                暂无相关故事
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { storyListService, getStoryDetail } from '@/api/story';
import { useRouter } from 'vue-router';

interface Story {
    id: number;
    title: string;
    content: string;
    isTop: boolean; // Assuming 0/1 maps to false/true
    type: string | null;
}

// --- 模拟数据 ---
const stories = ref<Story[]>([

]);
const getStoryList = async () => {
    const res = await storyListService();
    stories.value = res.data;
}
const categories = ref<string[]>([]);
const selectedCategory = ref<string>('全部');

// --- 生命周期钩子 ---
onMounted(async () => {
    // 实际应用中，这里应该调用 API 获取故事数据
    await getStoryList()
    generateCategories();
});

// --- 方法 ---
const generateCategories = () => {
    const types = new Set<string>(stories.value.map(s => s.type).filter(t => t !== null) as string[]);
    categories.value = ['全部', ...Array.from(types)];
    // 根据图片调整顺序
    const desiredOrder = ['全部', '心理健康', '人际交往', '自我认知', '挫折磨砺'];
    categories.value.sort((a, b) => {
        const indexA = desiredOrder.indexOf(a);
        const indexB = desiredOrder.indexOf(b);
        // 如果类型不在期望顺序中，放到最后
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
};

const selectCategory = (category: string) => {
    selectedCategory.value = category;
};

const truncateContent = (content: string, maxLength: number = 150): string => {
    if (!content) return '';
    // 先移除 HTML 标签
    content = content.replace(/<[^>]+>/g, '');
    // 随机生成 30-50 之间的长度
    const previewLength = Math.floor(Math.random() * 21) + 30;
    return content.length > previewLength
        ? `${content.substring(0, previewLength)}...`
        : content;
};

const router = useRouter();

const goToDetail = (id: number) => {
    router.push(`/story/${id}`);
};

// 添加返回方法
const goBack = () => {
    router.push('/mildEmotion');
};

// --- 计算属性 ---
const filteredStories = computed(() => {
    let result = stories.value;

    if (selectedCategory.value !== '全部') {
        result = result.filter(story => story.type === selectedCategory.value);
    }

    // 置顶优先，然后可以按其他条件排序（例如 ID 或日期）
    result.sort((a, b) => {
        if (a.isTop && !b.isTop) return -1;
        if (!a.isTop && b.isTop) return 1;
        return a.id - b.id; // 或者按创建时间等排序
    });

    return result;
});

</script>

<style scoped>
.story-share-container {
    padding: 20px;
    background-color: #f5f5f5;
    /* 浅灰色背景，接近图片 */
    font-family: sans-serif;
    max-width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 1.2em;
    gap: 1.2em;
}

.back-button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    position: absolute;
    font-size: 1.2rem;
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

.categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
}

.category-button {
    padding: 8px 16px;
    border: none;
    border-radius: 16px;
    /* 圆角 */
    background-color: #fff;
    /* 默认白色 */
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    /* 轻微阴影 */
}

.category-button:hover {
    background-color: #eee;
    /* 悬停效果 */
}

.category-button.active {
    background-color: #e8d9a3;
    /* 图片中的黄色 */
    color: #333;
    /* 深色文字 */
    font-weight: bold;
}

.story-list {
    display: grid;
    gap: 20px;
}

.story-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    overflow: hidden;
    /* 确保指示器在卡片内 */
}

.story-card-indicator {
    width: 5px;
    background-color: #e8d9a3;
    /* 黄色指示条 */
    flex-shrink: 0;
    /* 防止指示条被压缩 */
}

.story-card-content {
    padding: 15px 20px;
    flex-grow: 1;
}

.story-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
}

.story-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.top-tag {
    background-color: #e8d9a3;
    color: #333;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
}

.story-snippet {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    /* 也可以用 CSS 实现省略号，但 JS 截断更灵活 */
    /*
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  */
}

.no-stories {
    text-align: center;
    color: #999;
    margin-top: 20px;
    font-size: 16px;
}
</style>
