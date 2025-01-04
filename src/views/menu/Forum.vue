<!-- 论坛信息 -->
<script lang="ts" setup>
import Editor from '@/components/Forum/editor.vue';
import PostCard from '@/components/forum/PostCard.vue';
import { ChatLineSquare, CircleCheck, Clock, Compass, Document, Edit, EditPen, Star } from '@element-plus/icons-vue';
import type { maxHeaderSize } from 'http';
import { ref } from 'vue';
import WeatherInfo from '@/components/forum/WeatherInfo.vue';
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
const topics = ref([
    {
        "id": "1",
        "author": {
            "id": "user1",
            "name": "小雨",
            "avatarUrl": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        "timestamp": "2024-11-29T22:54:13",
        "category": "求助倾诉",
        "title": "总是感到焦虑，该如何调节？",
        "content": "最近工作压力很大，经常失眠，感觉很焦虑。白天注意力难以集中，不知道该如何调节自己的状态。希望有经验的朋友能给些建议。",
        "stats": {
            "likes": 15,
            "favorites": 8
        }
    },
    {
        "id": "2",
        "author": {
            "id": "user2",
            "name": "阳光小树",
            "avatarUrl": "https://cube.elemecdn.com/1/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        "timestamp": "2024-11-28T10:30:45",
        "category": "经验分享",
        "title": "我是如何走出抑郁的",
        "content": "去年经历了一段低谷期，通过正确的方法和坚持，现在已经重拾信心。分享一下我的心路历程，希望能帮助到有类似经历的朋友。",
        "stats": {
            "likes": 42,
            "favorites": 23
        }
    },
    {
        "id": "3",
        "author": {
            "id": "user3",
            "name": "暖心语",
            "avatarUrl": "https://cube.elemecdn.com/2/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        "timestamp": "2024-11-27T18:20:00",
        "category": "积极心理",
        "title": "每天一个积极心理小练习",
        "content": "分享一些简单但有效的积极心理学练习方法，帮助大家培养乐观心态。这些方法我已经坚持了三个月，确实感受到了很大的改变。",
        "stats": {
            "likes": 35,
            "favorites": 19
        }
    },
    {
        "id": "4",
        "author": {
            "id": "user4",
            "name": "心灵摆渡人",
            "avatarUrl": "https://cube.elemecdn.com/3/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        "timestamp": "2024-11-26T15:10:00",
        "category": "日常成长",
        "title": "学会与自己对话：自我关怀的重要性",
        "content": "很多时候我们对别人很温柔，却总是苛责自己。今天想和大家分享如何培养自我关怀，学会善待自己的内心。",
        "stats": {
            "likes": 28,
            "favorites": 16
        }
    }
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
                <div class="postList">
                    <PostCard v-for="(topic, index) in topics" :key="topic.id" class="topic-card">
                        <div class="author-info" style="display: flex">
                            <div>
                                <el-avatar :size="30" :src="topic.author.avatarUrl" />
                            </div>
                            <div style="margin-left: 1em; transform: translateY(.3em);">
                                <div style="font-size: 1.4em;font-weight: bold">{{ topic.author.name }}</div>
                                <div style="font-size: 1.2em;color: grey">
                                    <el-icon>
                                        <Clock />
                                    </el-icon>
                                    <div style="margin-left: .2em;display: inline-block;transform: translateY(-2px)">
                                        {{ new Date(topic.timestamp).toLocaleString() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="title-section" style="margin-top: 1.2em; display: flex; align-items: center;">
                            <el-tag size="middle" type="success">{{ topic.category }}</el-tag>
                            <span style="font-weight: bold; font-size: 1.5em;">{{ topic.title }}</span>
                        </div>
                        <div class="topic-preview-content">{{ topic.content }}</div>
                        <div class="stats-section" style="display: flex; gap: 20px; font-size: 1.2em;">
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
                        </div>
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
            <el-drawer v-model="isDrawerVisible" title="发表主题" size="59em" :with-header="false" :show-close="true"
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
</style>
