<!-- 论坛信息 -->
<script lang="ts" setup>
import Editor from '@/components/Forum/editor.vue';
import PostCard from '@/components/forum/PostCard.vue';
import { ChatLineSquare, CircleCheck, Clock, Compass, Document, Edit, EditPen, Star } from '@element-plus/icons-vue';
import type { maxHeaderSize } from 'http';
import { onMounted, ref } from 'vue';
import WeatherInfo from '@/components/forum/WeatherInfo.vue';
import { getPostsService } from '@/api/posts';
const isDrawerVisible = ref(false);
// 打开 Drawer
const openEditor = () => {
    isDrawerVisible.value = true;
};

// 关闭 Drawer
const closeEditor = () => {
    isDrawerVisible.value = false;
};
const type = ref(["全部", "求助倾诉", "经验分享", "积极心理", "日常成长"]);
const getColor = (index: number) => {
    const colors = ['#7eb0e3', '#95b3d7', '#b4c7e7', '#88b378', '#c3d69b']; // 更温和的颜色
    return colors[index % colors.length];
};
onMounted(async () => {
    let res = await getPostsService();
    topics.value = res.data;
    console.log(res.data);
})
const topics = ref([
    {

        "authorName": "",
        "authorAvatarUrl": "",
        "createdAt": "",
        "category": "",
        "title": "",
        "content": "",
        // "stats": {
        //     "likes": 15,
        //     "favorites": 8
        // }
    },


]);
</script>

<template>
    <div class="forum-information">
        <!-- 整体布局 -->
        <div class="container">
            <!-- 左侧内容 -->
            <div class="content">
                <el-card style="width: 100%;" shadow="never">
                    <!-- 点击发表主题（要求左侧有一个icon），且此栏是一个card，下栏有几个icon -->
                    <div @click="openEditor" class="post-button">
                        <el-icon>
                            <EditPen />
                        </el-icon> <span>点击发表主题</span>
                    </div>
                    <!-- 下方图标 -->
                    <div class="icon-container">
                        <el-icon :size="20">
                            <Edit />
                        </el-icon>
                        <el-icon :size="20">
                            <Document />
                        </el-icon>
                        <el-icon :size="20">
                            <ChatLineSquare />
                        </el-icon>
                        <el-icon :size="20">
                            <Compass />
                        </el-icon>
                    </div>
                </el-card>

                <el-card style="width: 100%;margin-top: 1em;" shadow="never">
                    <span style="margin-right: 1em;" v-for="(item, index) in type" :key="item">
                        <el-button @click="">
                            <div class="type-icon" :style="{ 'background-color': getColor(index) }">
                            </div>
                            <span>{{ item }}</span>
                        </el-button>
                    </span>
                </el-card>
                <!-- 帖子展示区 -->
                <el-skeleton :rows="15" animated v-if="!topics[0].title" />
                <div v-else class="postList">
                    <PostCard v-for="(topic, index) in topics" class="topic-card">
                        <div class="author-info" style="display: flex">
                            <div>
                                <el-avatar :size="40" :src="topic.authorAvatarUrl" />
                            </div>
                            <div style="margin-left: 1em; transform: translateY(.3em);">
                                <div style="font-size: 1.4em;font-weight: bold">{{ topic.authorName }}</div>
                                <div style="font-size: 1.2em;color: grey;margin-top: .5em;display: flex; ">
                                    <el-icon>
                                        <Clock />
                                    </el-icon>
                                    <div style="margin-left: .2em;">
                                        {{ new Date(topic.createdAt).toLocaleString() }}
                                        <!-- {{ topic.createdAt }} -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="title-section" style="margin-top: 1.2em; display: flex; align-items: center;">
                            <el-tag size="middle" type="success">{{ topic.category }}</el-tag>
                            <span style="font-weight: bold; font-size: 1.5em;">{{ topic.title }}</span>
                        </div>
                        <div class="topic-preview-content" v-html="topic.content"></div>
                        <!-- <div class="stats-section" style="display: flex; gap: 20px; font-size: 1.2em;">
                            <div style="display: flex; align-items: center;">
                                <el-icon style="margin-right: 5px;">
                                    <CircleCheck />
                                </el-icon>
                                {{ topic.stats.likes }} 点赞
                            </div>
                            <div style="display: flex; align-items: center;">
                                <el-icon style="margin-right: 5px;">
                                    <Star />
                                </el-icon>
                                {{ topic.stats.favorites }} 收藏
                            </div>
                        </div> -->
                    </PostCard>
                </div>
            </div>


            <!-- 右侧工具 -->
            <div class="sidebar">
                <div class="tools">
                    <p style="font-size: 1.6em;gap:1em; margin: 0 0 1.5em 0; padding: 15px 15px 0 15px">
                        <svg t="1732845516192" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2200" width="32" height="32">
                            <path
                                d="M140.2 462.9l5.7-2.9c12.7-91.8 72.6-152.4 166.1-163.2 34.2-3.9 65.3 1.3 101.6 15.4 43.3-65.5 113.7-100.1 195.3-110.4-58.6-87.8-158.5-145.6-272-145.6C156.3 56.2 10 202.5 10 383c0 48.3 10.5 94.1 29.2 135.3 32.7-25.4 58.7-47.7 101-55.4z"
                                fill="#79B7FF" p-id="2201"></path>
                            <path
                                d="M0 733.2c0 129.7 105 234.7 234.7 234.7h554.7c129.7 0 234.7-105 234.7-234.7 0-99.6-62.1-184.5-149.5-218.7l0.2-5.3c0-135.5-109.9-245.3-245.3-245.3-85.7 0-161.1 44-205 110.5-23.7-16-52.3-25.2-83-25.2-82.7 0-149.5 66.8-149.5 149.3v3.9C82.8 522.4 0 618.2 0 733.2z"
                                fill="#79B7FF" p-id="2202"></path>
                        </svg>
                        天气信息
                    </p>
                    <WeatherInfo />
                </div>
            </div>
        </div>
        <div class="editorDrawer">
            <el-drawer v-model="isDrawerVisible" title="发表主题" size="80%" :with-header="false" :show-close="true"
                direction="btt" @close="closeEditor" :style="{ width: '55%', margin: '0 auto' }">
                <Editor />
            </el-drawer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
    padding: 1.2em;

}

.container {
    display: flex;
    max-width: 70%;
    margin: 0 auto;
    padding: 1.2em;

}

/* 左侧内容区域 */
.content {
    flex: 2.2;
    flex-direction: column;
    /* 左侧占比 */
    // background-color: #ffffff;
    /* width: 700px; */
    padding: 1.2em;
    border-radius: 8px;
    transform: translateY(-1em);

    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    .post-button {
        cursor: pointer;
        display: inline-flex;
        /* 使用flex布局 */
        align-items: center;
        /* 垂直居中对齐 */
        gap: 8px;
        /* 图标和文字之间的间距 */
        font-size: 1.4em;
        width: 100%;
        color: var(--gray-2);
        padding: 1em .3em;
        height: 100%;
        background-color: #F0F0F0;
    }

    .icon-container {
        display: inline-flex;
        gap: 10px;
        margin-top: 1em
    }


    .el-button {
        transition: .3s;
    }

    /*按钮悬浮*/
    .el-button:hover {
        background: var(--gray-4) !important;
        color: #000 !important;
        border: 1px solid var(--gray-4) !important;
        font-weight: bold;
        opacity: 0.7;
    }

    .type-icon {
        display: inline-block;
        margin-right: 5px;
        border-radius: 5px;
        // background: linear-gradient(to right, red, palegoldenrod);
        width: 10px;
        height: 10px;
    }
}

/* 右侧工具区域 */
.sidebar {
    flex: 1;
    /* 右侧占比 */
    display: flex;
    flex-direction: column;
    gap: 2em;
    transform: translateY(.3em);

    .tools {

        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        background-color: #e8f1f2;

        p {
            display: flex;
            align-items: center;
            /* 垂直居中 */
        }
    }


}

.topic-card {
    margin-top: 10px;
    transition: scale .3s;
    padding: 20px;

    &:hover {
        scale: 1.01;
        cursor: pointer;
    }

    .topic-image {
        width: 100%;
        height: 100%;
    }

    .topic-preview-content {
        font-size: 1.3em;
        color: grey;
        margin: 1em 0;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .author-info {
        margin-bottom: 1.5em;
    }

    .title-section {
        margin: 1.2em 0;

        .el-tag {
            margin-right: 1em;
        }
    }

    .stats-section {
        margin-top: 1.5em;
        padding-top: 1em;
        border-top: 1px solid #f0f0f0;
    }
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
    .container {
        max-width: 85%;
        padding: 1em;
    }

    .content {
        padding: 1em;

        .post-button {
            font-size: 1.2em;
        }

        .topic-card {
            padding: 15px;

            .topic-preview-content {
                font-size: 1.2em;
            }
        }
    }
}

// 平板和手机横屏
@media screen and (max-width: 926px) and (orientation: landscape) {
    .container {
        max-width: 100%;
        padding: 0.8em;
        gap: 1em;
        flex-direction: row; // 确保在横屏时保持水平布局
    }

    .content {
        flex: 1.8;
        padding: 0.8em;
        max-height: 85vh; // 限制内容区域高度
        overflow-y: auto; // 添加垂直滚动
        transform: translateY(0); // 重置transform

        .post-button {
            font-size: 1.1em;
            padding: 0.8em 0.3em;
        }

        .icon-container {
            gap: 8px;
            margin-top: 0.8em;
        }

        .topic-card {
            padding: 12px;
            margin-top: 8px;

            .topic-preview-content {
                font-size: 1.1em;
                line-height: 1.5;
                margin: 0.8em 0;
                -webkit-line-clamp: 2; // 在横屏时减少显示行数
            }

            .author-info {
                margin-bottom: 1em;

                .el-avatar {
                    transform: scale(0.9);
                }
            }

            .title-section {
                margin: 0.8em 0;
                gap: 8px;

                span {
                    font-size: 1.3em;
                }

                .el-tag {
                    transform: scale(0.9);
                    margin-right: 0.8em;
                }
            }

            .stats-section {
                font-size: 1em;
                margin-top: 1em;
                padding-top: 0.8em;
                gap: 15px;
            }
        }
    }

    .sidebar {
        flex: 1;
        gap: 0.8em;
        max-height: 85vh; // 限制侧边栏高度
        overflow-y: auto; // 添加垂直滚动
        transform: translateY(0); // 重置transform

        .tools {
            p {
                font-size: 1.3em;
                padding: 12px;

                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }

    :deep(.el-drawer) {
        width: 70% !important; // 在横屏模式下调整抽屉宽度
        margin: 0 auto;
    }
}

// 手机竖屏
@media screen and (max-width: 768px) and (orientation: portrait) {
    .container {
        flex-direction: column;
        max-width: 100%;
        padding: 0.5em;
    }

    .content {
        padding: 0.5em;
        transform: translateY(0);

        .post-button {
            font-size: 1em;
            padding: 0.6em 0.3em;
        }

        .topic-card {
            padding: 10px;

            .topic-preview-content {
                font-size: 1em;
                -webkit-line-clamp: 2;
            }

            .author-info {
                margin-bottom: 1em;
            }

            .title-section {
                margin: 0.8em 0;

                span {
                    font-size: 1.2em;
                }
            }

            .stats-section {
                font-size: 1em;
                margin-top: 1em;
                padding-top: 0.6em;
            }
        }
    }

    .sidebar {
        order: -1;
        transform: translateY(0);

        .tools {
            p {
                font-size: 1.2em;
                padding: 10px;
            }
        }
    }

    :deep(.el-drawer) {
        width: 100% !important;
    }
}

// 超小屏幕
@media screen and (max-width: 480px) {
    .container {
        padding: 0.3em;
    }

    .content {
        padding: 0.3em;

        .post-button {
            font-size: 0.9em;
            padding: 0.5em 0.2em;
        }

        .icon-container {
            gap: 6px;
        }

        .topic-card {
            padding: 8px;

            .topic-preview-content {
                font-size: 0.9em;
                margin: 0.6em 0;
            }

            .title-section {
                margin: 0.6em 0;

                span {
                    font-size: 1.1em;
                }
            }

            .stats-section {
                font-size: 0.9em;
                margin-top: 0.8em;
                padding-top: 0.5em;
            }
        }
    }

    .sidebar {
        .tools {
            p {
                font-size: 1.1em;
                padding: 8px;
            }
        }
    }
}
</style>
