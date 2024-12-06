<template>
    <div class="common-sense">
        <!-- 整体布局 -->
        <div class="container">
            <!-- 左侧内容 -->
            <div class="content">
                <el-skeleton :rows="50" animated v-if="posts.length <= 1" />

                <div v-else class="post" v-for="post in posts" :key="post.id">
                    <div @click="goToDetail(post.id)">
                        <h3 class="post-title">{{ post.title }}</h3>
                        <p class="post-content">{{ post.content }}</p>
                    </div>

                    <div class="post-footer">
                        <span>
                            <!-- <img @click="toggleLike(post)" :src="post.liked ? likeSvgActive : likeSvg" alt="like"> -->
                            <div class="likeSvg" @click="toggleLike(post)">
                                <svg v-if="!post.liked" t="1732108152748" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2070" width="32" height="32">
                                    <path
                                        d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z"
                                        fill="#000000" p-id="2071"></path>
                                </svg>

                                <svg v-else t="1732108351923" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2604" width="32" height="32">
                                    <path
                                        d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z"
                                        fill="#1296db" p-id="2605"></path>
                                </svg>
                            </div>

                            点赞
                        </span>
                        <span>
                            <div @click="toggleStar(post)">


                                <svg v-if="!post.starred" t="1732108847020" class="icon" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4438" width="32" height="32">
                                    <path
                                        d="M512.73613 151.4l103 208.7c11.7 23.6 34.2 40 60.2 43.8l230.3 33.5-166.6 162.4c-18.9 18.4-27.5 44.9-23 70.8L755.93613 900l-206-108.3c-11.4-6-24.3-9.2-37.2-9.2-12.9 0-25.8 3.2-37.2 9.2L269.53613 900l39.3-229.4c4.5-26-4.2-52.4-23-70.8L119.23613 437.3l230.3-33.5c26.1-3.8 48.6-20.1 60.2-43.8l103-208.6M512.73613 27c-5.7 0-11.4 3-14.3 8.9l-146 295.9c-2.3 4.7-6.8 8-12 8.8L13.73613 388c-13.1 1.9-18.4 18-8.9 27.3l236.3 230.3c3.8 3.7 5.5 9 4.6 14.2L190.03613 985c-1.8 10.3 6.4 18.7 15.8 18.7 2.5 0 5-0.6 7.4-1.9l292.1-153.5c2.3-1.2 4.9-1.8 7.4-1.8s5.1 0.6 7.4 1.8l292.1 153.5c2.5 1.3 5 1.9 7.4 1.9 9.3 0 17.5-8.4 15.8-18.7l-55.8-325.2c-0.9-5.2 0.8-10.5 4.6-14.2l236.3-230.3c9.5-9.3 4.3-25.4-8.9-27.3l-326.5-47.4c-5.2-0.8-9.7-4-12-8.8l-146-295.9c-3-6-8.7-8.9-14.4-8.9z"
                                        fill="#000000" p-id="4439"></path>
                                </svg>



                                <svg v-else t="1732108889420" class="icon" viewBox="0 0 1025 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4606" width="32" height="32">
                                    <path
                                        d="M784.16441 645.6c-3.8 3.7-5.5 9-4.6 14.2L835.36441 985c1.8 10.3-6.4 18.7-15.8 18.7-2.5 0-5-0.6-7.5-1.9L520.16441 848.3c-2.3-1.2-4.9-1.8-7.5-1.8s-5.1 0.6-7.5 1.8l-292.1 153.5c-2.5 1.3-5 1.9-7.5 1.9-9.3 0-17.5-8.4-15.8-18.7L245.66441 659.8c0.9-5.2-0.8-10.5-4.6-14.2L4.86441 415.3C-4.63559 406 0.56441 389.9 13.66441 388l326.5-47.5c5.2-0.8 9.7-4 12-8.8l146-295.9c2.9-5.9 8.6-8.9 14.3-8.9s11.4 3 14.3 8.9l146 295.9c2.3 4.7 6.8 8 12 8.8L1011.66441 388c13.1 1.9 18.4 18 8.9 27.3L784.16441 645.6z"
                                        p-id="4607" fill="#1196db"></path>
                                </svg>
                                收藏
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 右侧工具 -->
            <div class="sidebar">
                <!-- 工具区域 -->
                <div class="tools">
                    <p style="font-size: 1.5em; margin: 0 0 1.5em 0; padding: 15px 15px 0 15px">
                        <svg t="1732109612981" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3320" width="32" height="32">
                            <path
                                d="M618 694.6V831c0 9.3-7.4 16.7-16.7 16.7H418.5c-9.3 0-16.7-7.4-16.7-16.7V694.6c0-7-4.2-13-10.7-15.8-115.5-49.2-194.4-168.4-183.2-304.3 12.1-148 132.2-266.7 280.2-277.4 177.2-12.5 325.2 127.6 325.2 302.4 0 125.2-76.1 232.9-184.6 279.2-6.6 3-10.7 9-10.7 15.9z"
                                fill="#FFBA40" p-id="3321"></path>
                            <path
                                d="M601.3 869.5H418.5c-21.3 0-38.5-17.2-38.5-38.5V697.9c-127.6-55.7-205-186-193.9-325.2C198.6 214.5 328.1 87 486.7 75.9c91.4-6.5 178.1 24.1 244.9 86.3 65.9 61.2 103.4 148 103.4 238 0 129.4-76.5 246.3-194.8 297.8v133c-0.4 21.4-17.6 38.5-38.9 38.5z m-177.7-43.6h173V694.6c0-15.3 9.3-29.7 23.7-35.7 103.9-44.5 171.2-146.1 171.2-258.8 0-77.9-32.5-153.1-89.5-206-58-53.8-133.1-80.2-212.4-74.7-137.3 9.3-249.1 120.1-260.2 257-9.7 121.5 58.4 235.2 170.2 282.5 14.4 6 23.7 19.9 23.7 35.7v131.3h0.3z"
                                fill="#333333" p-id="3322"></path>
                            <path
                                d="M451.9 766.1c-12.1 0-21.8-9.7-21.8-21.8V572.7c0-43.1-35.3-78.4-78.4-78.4-12.1 0-21.8-9.7-21.8-21.8s9.7-21.8 21.8-21.8c67.3 0 122 54.7 122 122v171.6c0 12-9.7 21.8-21.8 21.8z m100.7 0c-12.1 0-21.8-9.7-21.8-21.8V572.7c0-67.3 54.7-122 122-122 12.1 0 21.8 9.7 21.8 21.8s-9.7 21.8-21.8 21.8c-43.1 0-78.4 35.3-78.4 78.4v171.6c0 12-9.8 21.8-21.8 21.8z"
                                fill="#333333" p-id="3323"></path>
                            <path
                                d="M652.8 652.9H367c-24.6 0-44.5 19.9-44.5 44.5s19.9 44.5 44.5 44.5h285.7c24.6 0 44.5-19.9 44.5-44.5 0.1-24.6-19.9-44.5-44.4-44.5z"
                                fill="#27C18F" p-id="3324"></path>
                            <path
                                d="M652.8 763.3H367c-36.6 0-66.3-29.7-66.3-66.3 0-36.6 29.7-66.3 66.3-66.3h285.7c36.6 0 66.3 29.7 66.3 66.3 0.1 36.6-29.6 66.3-66.2 66.3zM367 674.7c-12.5 0-22.7 10.2-22.7 22.7s10.2 22.7 22.7 22.7h285.7c12.5 0 22.7-10.2 22.7-22.7s-10.2-22.7-22.7-22.7H367z"
                                fill="#333333" p-id="3325"></path>
                            <path
                                d="M631.4 741.5h-243c-24.6 0-44.5 19.9-44.5 44.5s19.9 44.5 44.5 44.5h243.1c24.6 0 44.5-19.9 44.5-44.5-0.5-24.6-20.5-44.5-44.6-44.5z"
                                fill="#27C18F" p-id="3326"></path>
                            <path
                                d="M631.4 852.4h-243c-36.6 0-66.3-29.7-66.3-66.3s29.7-66.3 66.3-66.3h243.1c36.6 0 66.3 29.7 66.3 66.3-0.5 36.6-30.2 66.3-66.4 66.3z m-243-89.1c-12.5 0-22.7 10.2-22.7 22.7s10.2 22.7 22.7 22.7h243.1c12.5 0 22.7-10.2 22.7-22.7s-10.2-22.7-22.7-22.7H388.4z"
                                fill="#333333" p-id="3327"></path>
                            <path
                                d="M579.9 830.6H439.8c-24.6 0-44.5 19.9-44.5 44.5s19.9 44.5 44.5 44.5h140.1c24.6 0 44.5-19.9 44.5-44.5-0.4-24.6-20.3-44.5-44.5-44.5z"
                                fill="#27C18F" p-id="3328"></path>
                            <path
                                d="M579.9 941H439.8c-36.6 0-66.3-29.7-66.3-66.3 0-36.6 29.7-66.3 66.3-66.3h140.1c36.6 0 66.3 29.7 66.3 66.3-0.4 36.6-30.1 66.3-66.3 66.3z m-140.1-88.6c-12.5 0-22.7 10.2-22.7 22.7s10.2 22.7 22.7 22.7h140.1c12.5 0 22.7-10.2 22.7-22.7s-10.2-22.7-22.7-22.7H439.8zM566.5 369c0 19 15.4 34.3 34.3 34.3 19 0 34.3-15.4 34.3-34.3 0-19-15.4-34.3-34.3-34.3S566.5 350 566.5 369zM370.3 369c0 19 15.4 34.3 34.3 34.3 19 0 34.3-15.4 34.3-34.3 0-19-15.4-34.3-34.3-34.3-19 0-34.3 15.3-34.3 34.3zM468.6 369c0 19 15.3 34.3 34.3 34.4 19 0 34.3-15.3 34.4-34.3v-0.1c0-19-15.4-34.3-34.3-34.3-19 0-34.4 15.3-34.4 34.3z"
                                fill="#333333" p-id="3329"></path>
                        </svg>
                        跃动一下
                    </p>
                    <FunClass />

                    <!-- funClass -->
                </div>
                <!-- 关注推荐 -->
                <div class="quote">
                    <p style="font-size: 1.5em; margin: 0 0 1.5em 0; padding: 15px 15px 0 15px">
                        <svg t="1732109322983" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="27931" width="32" height="32">
                            <path
                                d="M506.8 185.8c-164.6 0-298.1 132.4-298.1 295.8 0 104.8 55 196.8 137.8 249.3L288.7 825l137.1-58.8a300.6 300.6 0 0 0 81 11.1c164.6 0 298.1-132.4 298.1-295.8S671.4 185.8 506.8 185.8z"
                                fill="#F68F3B" p-id="27932"></path>
                            <path
                                d="M703.9 361.5c-4.9 0-9.7-2.5-12.3-7.1-31.7-54.8-90.6-73.2-91.2-73.4-7.5-2.3-11.7-10.1-9.4-17.6 2.3-7.4 10.2-11.6 17.6-9.4 2.8 0.8 70.1 21.5 107.6 86.3 3.9 6.7 1.6 15.4-5.2 19.2-2.2 1.4-4.7 2-7.1 2zM551.7 268.8c-1.2 0-2.5-0.1-3.7-0.5-21.3-5.7-38.9-3.2-39.1-3.2-7.8 1.2-15-4.1-16.1-11.8-1.2-7.7 4.1-14.8 11.8-16 1-0.1 23.4-3.5 50.8 3.8 7.6 2 12 9.8 10 17.3-1.7 6.2-7.4 10.4-13.7 10.4z"
                                fill="#FFFFFF" p-id="27933"></path>
                            <path
                                d="M506.8 167c-174.8 0-317 141.1-317 314.6 0 101.7 48.7 195.7 131.3 254.9l-48.6 78.9c-4.2 6.9-3.5 15.8 1.8 21.9 3.7 4.3 9 6.6 14.4 6.6 2.4 0 4.8-0.5 7.1-1.4L427 786c26.1 6.7 52.9 10.1 79.8 10.1 174.8 0 317-141.1 317-314.6 0-173.4-142.2-314.5-317-314.5z m0 591.6c-25.5 0-51.1-3.5-75.9-10.4-4.1-1.2-8.4-0.9-12.3 0.7l-84.4 37.5 28.4-45.8c5.3-8.7 2.6-20-6-25.5-80.8-51.3-129-138.6-129-233.5 0-152.7 125.2-277 279.1-277s279.1 124.3 279.1 277c0.1 152.7-125.1 277-279 277z"
                                fill="#211F1E" p-id="27934"></path>
                            <path
                                d="M661.5 423.4c0-20.7-16.9-37.6-37.9-37.6-20.9 0-37.8 16.8-37.8 37.6 0 20.7 16.9 37.6 37.8 37.6 21 0 37.9-16.8 37.9-37.6zM433.1 423.4c0-20.7-16.9-37.6-37.9-37.6-20.9 0-37.8 16.8-37.8 37.6 0 20.7 16.9 37.6 37.8 37.6 21 0 37.9-16.8 37.9-37.6zM597.5 531.6c-9.7-3.9-20.7 0.7-24.7 10.3-0.2 0.4-16.2 38-63.4 38-48.6 0-61.6-32.8-62.9-36.8-3.2-9.8-13.9-15.1-23.7-12-10 3.1-15.5 13.7-12.3 23.6 0.8 2.6 21 62.8 98.9 62.8 72.3 0 97.4-58.8 98.4-61.3 4-9.7-0.6-20.6-10.3-24.6zM303.2 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3-3.3-7.3-7.3-7.3zM336.8 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0.1-4-3.2-7.3-7.3-7.3zM320 525.1c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0-4.1-3.2-7.3-7.3-7.3zM353.7 525.1c-4 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0-4.1-3.3-7.3-7.3-7.3zM336.8 546.9c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0.1-4-3.2-7.3-7.3-7.3zM374.8 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3-3.2-7.3-7.3-7.3zM654.7 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0.1-4-3.2-7.3-7.3-7.3zM688.4 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3-3.2-7.3-7.3-7.3zM671.6 525.1c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0-4.1-3.3-7.3-7.3-7.3zM705.3 525.1c-4 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c0-4.1-3.3-7.3-7.3-7.3zM688.4 546.9c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3-3.2-7.3-7.3-7.3zM726.4 502.4c-4.1 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3-3.3-7.3-7.3-7.3z"
                                fill="#211F1E" p-id="27935"></path>
                        </svg>
                        慧语心灯
                    </p>
                    <Quote />

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import starSvg from "@/assets/svg/star.svg";
import starSvgActive from "@/assets/svg/star_active.svg";
import FunClass from "@/components/aside/FunClass.vue";
import Quote from '@/components/aside/Quote.vue';
import { articleListByPageService, articleListService, getAllPagesTotal } from '@/api/article.ts';
import router from "@/router";


const goToDetail = (id: any) => router.push(
    { path: '/article', query: { id } }
);
// 切换点赞状态
const toggleLike = (post: any) => {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1; // 点赞计数变化
    console.log(post.liked);
};

// 切换收藏状态
const toggleStar = (post: any) => {
    post.starred = !post.starred;
    post.star += post.starred ? 1 : -1; // 收藏计数变化
};

// 帖子数据
// 定义 Post 接口
interface Post {
    title: string;
    content: string;
    createTime: string;
    userId: string;
    type: string;
    commentCount: string;
    likeCount: string;
    readCount: string;
    collectCount: string;
}

// 初始化 posts 数组，确保每个元素都符合 Post 接口
const posts = ref<Post[]>([]);
const stripHtmlTags = () => {
    posts.value.forEach(post => {
        if (post.content) { // 确保 content 存在并为字符串
            post.content = post.content.replace(/<[^>]+>/g, '');
        } else {
            post.content = ''; // 如果 content 为 null 或 undefined，设置为空字符串
        }
    });
    console.log(posts.value.length);
};

const postSummaries = () => {
    posts.value.forEach(post => {
        const previewLength = Math.floor(Math.random() * 21) + 30; // 随机生成30到50之间的数字
        if (post.content) { // 确保 content 存在
            post.content = post.content.length > previewLength
                ? `${post.content.substring(0, previewLength)}...`
                : post.content;
        }
    });
};

// const getArticleList = async () => {
//     const res = await articleListService();
//     posts.value = res.data;
//     stripHtmlTags();
//     postSummaries();
//     // console.log(posts.value);
// };
const page = ref({
    "current": 1,
    "size": 8,
    "totalPages": 10,
})


const getArticleListByPage = async () => {
    // TODO：获取总页数
    const res = await articleListByPageService(page.value);
    posts.value = [...posts.value, ...res.data];  // 将新数据追加到 posts 数组
    stripHtmlTags();
    postSummaries();
};
const getTotalPages = async () => {
    const res = await getAllPagesTotal(page.value);
    page.value.totalPages = res.data;
}
// 页面滚动加载更多功能
const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    // 判断是否滚动到页面底部
    if (scrollTop + windowHeight >= documentHeight - 100 && page.value.current <= page.value.totalPages) {
        // 如果当前页面不是最后一页，则加载下一页数据
        if (page.value.current < page.value.totalPages) {
            page.value.current += 1;  // 切换到下一页
            getArticleListByPage();  // 获取新数据
        }
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getTotalPages();  // 获取总页数
    getArticleListByPage();  // 加载第一页数据
});
// 组件销毁时移除滚动事件监听器
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});




</script>

<style lang="scss" scoped>
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
    margin-bottom: 0.8em;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
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
    cursor: pointer;

    &:hover {

        color: var(--gray-2);
    }
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

.post-footer svg {
    cursor: pointer;
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    /* 添加放大效果 */
    -webkit-user-drag: none;
    /* 禁用Chrome和Safari中的拖拽 */
}

.post-footer svg:hover {
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

    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    p {
        display: flex;
        align-items: center;
        /* 垂直居中 */
    }
}

.quote {

    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    p {
        display: flex;
        align-items: center;
        /* 垂直居中 */
    }

}

.quote h4 {
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
