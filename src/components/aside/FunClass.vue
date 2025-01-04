<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToRelaxation = () => {
    router.push('/relaxation');
};
</script>

<template>
    <div class="tools">
        <div class="row">
            <div class="tool">
                <img src="../../assets/svg/music.svg" alt="音乐推荐">
                <p>音乐推荐</p>
            </div>
            <div class="tool">
                <img src="../../assets/svg/diary.svg" alt="心情日记">
                <p>心情日记</p>
            </div>
        </div>
        <div class="row">
            <div class="tool" @click="goToRelaxation">
                <img src="../../assets/svg/rest.svg" alt="放松训练">
                <p>放松训练</p>
            </div>
            <div class="tool">
                <img src="../../assets/svg/story.svg" alt="故事分享">
                <p>故事分享</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tools {
    display: flex;
    flex-direction: column;
    /* 垂直布局，每行占一行 */
    align-items: center;
    /* 水平居中对齐 */
    gap: 16px;
    /* 每行间距 */
    padding: 20px;

    .row {
        display: flex;
        /* 横向布局 */
        gap: 16px;
        /* 每个工具之间的间距 */
    }

    .tool {
        display: flex;
        flex-direction: column;
        /* 垂直布局 */
        align-items: center;
        /* 居中对齐 */
        background-color: #f9f9f9;
        /* 背景色 */
        border-radius: 12px;
        /* 圆角 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        /* 阴影 */
        padding: 16px;
        /* 内边距 */
        width: 120px;
        /* 固定宽度 */
        text-align: center;
        cursor: pointer;

        /* 文字居中 */
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        }

        img {
            width: 48px;
            /* 图标大小 */
            height: 48px;
            margin-bottom: 8px;
            /* 图片与文字间距 */
        }

        p {
            margin: 0;
            /* 去除默认外边距 */
            font-size: 14px;
            /* 字体大小 */
            color: #333;
            /* 字体颜色 */
        }
    }
}
</style>
