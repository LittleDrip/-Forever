<template>
    <div class="common-sense">
        <!-- 整体布局 -->
        <div class="container">
            <!-- 左侧内容 -->
            <div class="content">
                <div class="post" v-for="post in posts" :key="post.id">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <p class="post-content">{{ post.content }}</p>
                    <div class="post-footer">
                        <span>
                            <img @click="toggleLike(post)" :src="post.liked ? likeSvgActive : likeSvg" alt="like">
                            点赞
                        </span>
                        <span>
                            <img @click="toggleStar(post)" :src="post.starred ? starSvgActive : starSvg" alt="star">
                            收藏
                        </span>
                    </div>

                </div>
            </div>

            <!-- 右侧工具 -->
            <div class=" sidebar">
                <!-- 工具区域 -->
                <div class="tools">

                    <p style="font-size: 1.5em;margin: 0 0 1.5em 0;">
                        <img src="../../assets/svg/light.svg" alt="">
                        跃动一下
                    </p>
                    <button>音乐推荐</button>
                    <button>心情日记</button>
                    <button>放松训练</button>
                    <button>故事分享</button>
                </div>
                <!-- 关注推荐 -->
                <div class="recommendations">
                    <div>
                        123
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import likeSvg from '@/assets/svg/like.svg';
import likeSvgActive from '@/assets/svg/like_active.svg';
import starSvg from '@/assets/svg/star.svg';
import starSvgActive from '@/assets/svg/star_active.svg';
// 切换点赞状态
const toggleLike = (post: any) => {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1; // 点赞计数变化
    console.log(post.liked)

};

// 切换收藏状态
const toggleStar = (post: any) => {
    post.starred = !post.starred;
    post.star += post.starred ? 1 : -1; // 收藏计数变化
};

// 帖子数据
const posts = ref([
    {
        id: 1,
        title: "现在找个3000的Java实习这么难吗？",
        content:
            "技术栈：我来回答下吧，帮你修改下你的简历，像这样的简历会我简历会我简历会我简历会我简历会会我简历会我简历会会我简历会我简历会会我简历会我简历会会我简历会我简历会会我简历会我简历会会我简历会我简历会会我简历会我简历会我简历会我简历会我简历会我的感觉…我的感觉…我的感觉…在给我的感觉……",
        likes: 280,
        star: 12,
        comments: 99,
        liked: false, // 是否点赞
        starred: false, // 是否收藏
    },
    {
        id: 2,
        title: "距离国考只剩一个多月了，还能来得及学习吗？",
        content: "努力搏一搏，来得及！那么一个多月的时间，我们怎么开始复习呢？……",
        likes: 109,
        star: 12,
        comments: 10,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
    {
        id: 3,
        title: "还剩两个月考研，感觉学不完了，有点想放弃怎么办？",
        content:
            "终于找到我遇到机会了，没错了，我就是最后两个月选择放弃的那个人……",
        likes: 86,
        star: 12,
        comments: 28,
        liked: false,
        starred: false,
    },
]);



</script>

<style scoped>
/* 页面整体样式 */
.container {
    display: flex;
    /* max-width: 1200px; */
    max-width: 70%;
    margin: 0 auto;
    padding: 1.2em;
    gap: 1.2em;
}

/* 左侧内容区域 */
.content {
    flex: 2.2;
    /* 左侧占比 */
    background-color: #ffffff;
    /* width: 700px; */
    padding: 1.2em;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post {
    margin-bottom: 2em;
    padding-bottom: 1.5em;
    border-bottom: 1px solid #e0e0e0;
}

.post-title {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: .8em;
}

.post-content {
    color: #666;


    max-width: 100%;
    /* 或者使用视口单位，如 max-width: 50vw; */
    min-width: 0;
    /* 允许内容区域缩小到0宽度 */
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 1.3em;
    line-height: 1.6;
    margin-bottom: 1em;

}

.post-footer {
    display: flex;
    /* 将子元素按行排列 */
    align-items: center;
    /* 子元素垂直居中 */
    gap: 20px;
    /* 设置子元素之间的间距 */
    font-size: 14px;
    /* 可调整为适合的字体大小 */
    color: #666;
    /* 设置文字颜色 */
}

.post-footer span {
    display: flex;
    /* 确保内部元素也是对齐的 */
    align-items: center;
    /* 图标和文字垂直居中 */
    gap: 5px;
    /* 图标与文字间距 */
}

.post-footer img {
    cursor: pointer;
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    /* 添加放大效果 */
    -webkit-user-drag: none;
    /* 禁用Chrome和Safari中的拖拽 */

}

.post-footer img:active {
    transform: scale(1.2);
    /* 点击时放大 */
}


/* 右侧工具区域 */
.sidebar {
    flex: 1;
    /* 右侧占比 */
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.tools {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tools h4 {
    font-size: 16px;
    margin-bottom: 10px;
}

.tools button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 14px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.tools button:hover {
    background-color: #0056b3;
}

.recommendations {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recommendations h4 {
    font-size: 16px;
    margin-bottom: 10px;
}

.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.user button {
    padding: 5px 10px;
    font-size: 12px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.user button:hover {
    background-color: #0056b3;
}

img {
    -webkit-user-drag: none;
    /* 禁用Chrome和Safari中的拖拽 */
}
</style>
