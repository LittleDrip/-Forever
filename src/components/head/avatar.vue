<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';

const userMenuVisible = ref(false);
// 登录操作
const handleLogin = () => {
    console.log("跳转到登录页面");
    router.push({ name: "登录" });
};

// 切换用户菜单显示状态
const toggleUserMenu = () => {
    userMenuVisible.value = !userMenuVisible.value;
};
</script>

<template>
    <div>
        <!-- 登录头像 -->
        <div class="avatar-container" @click="toggleUserMenu">
            <img class="avatar" src="@/assets/img/avatar-defalut.png" alt="User Avatar" />
            <div class="user-menu" v-if="userMenuVisible">
                <div @click="handleLogin">登录</div>
                <div>注册</div>
                <div>个人中心</div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.avatar-container {
    position: relative;
    margin-left: auto; // 推到右侧
    margin-right: 2em;
    cursor: pointer;

    .avatar {
        width: 4em;
        height: 4em;
        border-radius: 50%;
        transition: border-color 0.3s ease;
        object-fit: cover;
        /* 裁剪图片，确保填满容器 */
        object-position: center;
        transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease;
        /* 添加动画曲线 */

        /* 图片居中 */
        &:hover {
            transform: scale(1.1);
            /* 放大一点点（1.1 倍），更自然 */
        }
    }

    .user-menu {
        flex: 0 0 10%;
        position: absolute;
        top: 50px;
        right: 0;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
        z-index: 1000;
        min-width: 120px;

        div {
            padding: 10px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            text-align: center;

            &:hover {
                background-color: var(--lightblue);
                color: white;
            }
        }
    }
}
</style>