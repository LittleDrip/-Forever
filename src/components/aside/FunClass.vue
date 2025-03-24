<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToRelaxation = () => {
    router.push('/relaxation');
};

const goToBooks = () => {
    router.push('/books');
};

const goToDiary = () => {
    router.push('/diary');
};
</script>

<template>
    <div class="tools">
        <div class="row">
            <div class="tool" @click="goToBooks">
                <img src="../../assets/svg/book.svg" alt="书籍推荐">
                <p>书籍推荐</p>
            </div>
            <div class="tool" @click="goToDiary">
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
    align-items: center;
    gap: 16px;
    padding: 20px;

    .row {
        display: flex;
        gap: 16px;
    }

    .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f9f9f9;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 16px;
        width: 120px;
        text-align: center;
        cursor: pointer;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        }

        img {
            width: 48px;
            height: 48px;
            margin-bottom: 8px;
        }

        p {
            margin: 0;
            font-size: 14px;
            color: #333;
        }
    }
}
</style>
