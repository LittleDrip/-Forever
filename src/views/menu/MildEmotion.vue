<template>
    <div class="mild-emotion-container">
        <div class="back-button" @click="goBack">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.052938-18.416442-49.91597-18.416442-68.968908 0L291.910961 480.275316c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.439172 345.70441c19.052938 18.416442 49.91597 18.416442 68.968908 0 19.052938-18.416442 19.052938-48.273447 0-66.660212L395.21518 513.604544z" />
            </svg>
            <span>返回</span>
        </div>

        <div class="content-container">
            <!-- 左侧内容 -->
            <div class="left-panel">
                <div class="header">
                    <h1>轻度情绪调节</h1>
                    <p>我们为您准备了多种缓解轻度情绪问题的方式</p>
                </div>

                <el-carousel :interval="4000" arrow="always" height="450px" indicator-position="outside">
                    <el-carousel-item v-for="(img, index) in currentImages" :key="index">
                        <img :src="img" class="carousel-image" />
                    </el-carousel-item>
                </el-carousel>
            </div>

            <!-- 右侧推荐列表 -->
            <div class="right-panel">
                <h2>推荐内容</h2>
                <ul class="recommend-list">
                    <li v-for="(item, index) in recommendations" :key="index"
                        :class="{ active: index === selectedIndex }" @click="selectRecommendation(index)">
                        <div class="recommend-item-content">
                            <div class="recommend-title">{{ item.title }}</div>
                            <div class="recommend-description">{{ item.description }}</div>
                            <button class="access-button" @click.stop="navigateToModule(item.path)">
                                <template v-if="index === 0">查看推荐</template>
                                <template v-else-if="index === 1">开始记录</template>
                                <template v-else-if="index === 2">开始训练</template>
                                <template v-else-if="index === 3">浏览故事</template>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                                        fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
    router.push('/emotionalDivision');
};

// 推荐内容与对应轮播图
const recommendations = [
    {
        title: '书籍推荐',
        images: [
            new URL('@/assets/img/features/books2.png', import.meta.url).href,
            new URL('@/assets/img/features/books3.png', import.meta.url).href,
        ],
        description: '精选心理健康书籍，帮助您理解情绪，提升自我调节能力。',
        path: '/books'
    },
    {
        title: '心情日记',
        images: [
            new URL('@/assets/img/features/diary.png', import.meta.url).href,
            new URL('@/assets/img/features/diary2.png', import.meta.url).href,
        ],
        description: '记录每日心情，追踪情绪变化，培养自我觉察能力。',
        path: '/diary'
    },
    {
        title: '放松训练',
        images: [
            new URL('@/assets/img/features/relaxation1.png', import.meta.url).href,
            new URL('@/assets/img/features/relaxation2.png', import.meta.url).href,
            new URL('@/assets/img/features/relaxation3.png', import.meta.url).href,

        ],

        description: '呼吸练习、肌肉放松、冥想引导，缓解压力与焦虑。',
        path: '/relaxation'
    },
    {
        title: '故事分享',
        images: [
            new URL('@/assets/img/features/story.png', import.meta.url).href,
            new URL('@/assets/img/features/story2.png', import.meta.url).href,
        ],
        description: '真实治愈故事分享，获得共鸣与力量，不再孤单。',
        path: '/story'
    },
];

const selectedIndex = ref(0);
const currentImages = ref(recommendations[0].images);

const selectRecommendation = (index: number) => {
    selectedIndex.value = index;
    currentImages.value = recommendations[index].images;
};

const navigateToModule = (path: string) => {
    router.push(path);
};

</script>
<style lang="scss" scoped>
.mild-emotion-container {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
}

.back-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
    padding: 8px 12px;
    width: fit-content;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    position: absolute;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .icon {
        fill: #555;
        margin-right: 6px;
    }

    span {
        font-size: 16px;
        color: #555;
    }
}

.content-container {
    display: flex;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 30px;
}

.left-panel {
    flex: 2;

    .header {
        text-align: center;
        margin-bottom: 24px;

        h1 {
            font-size: 2.2rem;

            color: #333;
            margin-bottom: 8px;
        }

        p {
            font-size: 1.1rem;
            color: #666;
            margin: 0;
        }
    }

    :deep(.el-carousel__arrow) {
        background-color: rgba(232, 213, 117, 0.8);
        border-radius: 50%;

        &:hover {
            background-color: rgba(232, 213, 117, 1);
        }
    }

    :deep(.el-carousel__indicators) {
        margin-top: 12px;
    }
}

.right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;

    h2 {
        font-size: 1.6rem;
        font-weight: 500;
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f0f0f0;
    }

    .recommend-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
            padding: 14px 18px;
            background-color: #f8f9fa;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.1rem;
            border-left: 4px solid transparent;

            &:hover {
                background-color: #f0f0f0;
                border-left-color: #e8d575;
            }

            &.active {
                background-color: #fff;
                color: #333;
                border-left-color: #e8d575;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                font-weight: 500;
            }

            .recommend-item-content {
                display: flex;
                flex-direction: column;
                gap: 8px;

                .recommend-title {
                    font-weight: 500;
                    font-size: 1.1rem;
                    color: #333;
                }

                .recommend-description {
                    font-size: 0.9rem;
                    color: #666;
                    line-height: 1.4;
                }

                .access-button {
                    align-self: flex-start;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background-color: #e8d575;
                    color: #333;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    margin-top: 6px;
                    transition: all 0.2s ease;

                    &:hover {
                        background-color: darken(#e8d575, 10%);
                        transform: translateX(3px);
                    }

                    svg {
                        transition: transform 0.2s ease;
                    }

                    &:hover svg {
                        transform: translateX(3px);
                    }
                }
            }
        }
    }
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
}

@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .right-panel {
        margin-top: 30px;
    }
}
</style>