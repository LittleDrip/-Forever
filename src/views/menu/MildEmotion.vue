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
    <div class="mild-emotion-container">
        <div class="header">
            <h1>轻度情绪调节</h1>
            <p>我们为您准备了多种缓解轻度情绪问题的方式</p>
        </div>

        <div class="carousel-container">
            <el-carousel :interval="5000" type="card" height="400px">
                <!-- 书籍推荐 -->
                <el-carousel-item>
                    <div class="feature-card book-recommendation">
                        <div class="feature-content">
                            <div class="feature-text">
                                <h2>书籍推荐</h2>
                                <p>精选书籍帮助您理解和调节情绪，提供专业心理学知识</p>
                                <el-button type="warning" class="feature-button"
                                    @click="navigateTo('/books')">查看推荐</el-button>
                            </div>
                            <div class="feature-image">
                                <img src="@/assets/img/features/books.png" alt="书籍推荐" />
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 心情日记 -->
                <el-carousel-item>
                    <div class="feature-card mood-diary">
                        <div class="feature-content">
                            <div class="feature-text">
                                <h2>心情日记</h2>
                                <p>记录每日心情变化，追踪情绪趋势，帮助您更好地了解自己</p>
                                <el-button type="warning" class="feature-button"
                                    @click="navigateTo('/diary')">开始记录</el-button>
                            </div>
                            <div class="feature-image">
                                <img src="@/assets/img/features/diary.png" alt="心情日记" />
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 放松训练 -->
                <el-carousel-item>
                    <div class="feature-card relaxation">
                        <div class="feature-content">
                            <div class="feature-text">
                                <h2>放松训练</h2>
                                <p>包含呼吸练习、渐进式肌肉放松等科学方法，帮助缓解压力</p>
                                <el-button type="warning" class="feature-button"
                                    @click="navigateTo('/relaxation')">开始训练</el-button>
                            </div>
                            <div class="feature-image">
                                <img src="@/assets/img/features/relaxation.png" alt="放松训练" />
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 故事分享 -->
                <el-carousel-item>
                    <div class="feature-card story-sharing">
                        <div class="feature-content">
                            <div class="feature-text">
                                <h2>故事分享</h2>
                                <p>阅读和分享治愈系故事，获得情感共鸣与支持</p>
                                <el-button type="warning" class="feature-button"
                                    @click="navigateTo('/story')">浏览故事</el-button>
                            </div>
                            <div class="feature-image">
                                <!-- <img src="@/assets/img/features/stories.png" alt="故事分享" /> -->
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 功能导航卡片 -->
        <!-- <div class="feature-grid">
            <div class="grid-card" @click="navigateTo('/books')">
                <div class="icon-container">
                    <el-icon>
                        <Reading />
                    </el-icon>
                </div>
                <h3>书籍推荐</h3>
            </div>

            <div class="grid-card" @click="navigateTo('/diary')">
                <div class="icon-container">
                    <el-icon>
                        <Notebook />
                    </el-icon>
                </div>
                <h3>心情日记</h3>
            </div>

            <div class="grid-card" @click="navigateTo('/relaxation')">
                <div class="icon-container">
                    <el-icon>
                        <MagicStick />
                    </el-icon>
                </div>
                <h3>放松训练</h3>
            </div>

            <div class="grid-card" @click="navigateTo('/Forum')">
                <div class="icon-container">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                </div>
                <h3>故事分享</h3>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Reading, Notebook, MagicStick, ChatDotRound } from '@element-plus/icons-vue';

const router = useRouter();
const goBack = () => {
    router.push('/emotionalDivision');
};

const navigateTo = (path: string) => {
    router.push(path);
};
</script>

<style lang="scss" scoped>
.back-button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 1.2rem;
    padding: 10px;
    cursor: pointer;
    position: absolute;
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

.mild-emotion-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #333;
    height: 92.5vh;
}

.header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        font-size: 1.1rem;
        color: #666;
    }
}

.carousel-container {
    margin-bottom: 3rem;
}

:deep(.el-carousel__item) {
    border-radius: 16px;
}

.feature-card {
    height: 100%;
    padding: 2rem;
    border-radius: 16px;
    background-color: #fff;
    overflow: hidden;

    &.book-recommendation {
        background-color: rgba(232, 213, 117, 0.8);
    }

    &.mood-diary {
        background-color: rgba(232, 213, 117, 0.8);
    }

    &.relaxation {
        background-color: rgba(232, 213, 117, 0.8);
    }

    &.story-sharing {
        background-color: rgba(232, 213, 117, 0.8);
    }
}

.feature-content {
    display: flex;
    height: 100%;
    align-items: center;
}

.feature-text {
    flex: 1;
    padding-right: 2rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #333;
    }

    p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        color: #555;
    }
}

.feature-button {
    background-color: #e8d575 !important;
    border-color: #e8d575 !important;
    color: #333 !important;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 30px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        background-color: darken(#e8d575, 5%) !important;
        border-color: darken(#e8d575, 5%) !important;
    }
}

.feature-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 300px;
        object-fit: contain;
    }
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.grid-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
        transform: translateY(-5px);
        border-color: #e8d575;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .icon-container {
        width: 70px;
        height: 70px;
        background-color: #e8d575;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.5rem;

        .el-icon {
            font-size: 2rem;
            color: #fff;
        }
    }

    h3 {
        font-size: 1.2rem;
        text-align: center;
        color: #333;
    }
}
</style>