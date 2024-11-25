<script lang="ts" setup>
import { ref } from 'vue';
import { Edit, Picture, Upload, ChatLineRound, Avatar, User, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { unauthorized, deleteAccessToken } from '@/stores/token.ts';
import { useUserStore } from '@/stores/user'
import { userLogoutService } from '@/api/user';
const userStore = useUserStore();
const router = useRouter();
// const isLoggedIn = ref(false); // 用于判断是否已登录
const isUnauthorized = unauthorized()
const defaultAvatar = 'https://avatars.githubusercontent.com/u/9919?v=4';
const userAvatar = userStore.userInfo.avatar || defaultAvatar;

// 登录处理函数
const handleLogin = () => {
    console.log('跳转到登录页面');
    router.push({ name: '登录' }); // 假设登录页路由名为 Login
};

const handleLogout = async () => {
    let res = await userLogoutService();
    ElMessage({
        message: res.data,
        type: 'success',
    }
    )
    deleteAccessToken();
    userStore.clearUserInfo();
    // 清除 token
    // 重定向到登录页面
    router.push({ name: '登录' });
}
</script>

<template>
    <div class="avatar-container">
        <!-- 登录/用户信息展示 -->
        <el-popover trigger="hover" placement="bottom" :width="300">
            <!-- 登录按钮 -->
            <template #reference>
                <div @click="handleLogin" v-if="isUnauthorized" class="login-button">
                    <span>登录</span>
                </div>
                <el-avatar v-if="!isUnauthorized" :src="userAvatar" size="middle" class="user-avatar" />
            </template>

            <!-- 弹出的卡片内容 -->
            <div class="card1" v-if="isUnauthorized">
                <h3 style="text-align: center;margin-bottom: 2em;">登录后您可以</h3>
                <el-steps space="10em" style="max-width: 600px;" align-center :active="-1">
                    <el-step title="发表" :icon="Edit" />
                    <el-step title="评论" :icon="ChatLineRound" />
                    <el-step title="咨询" :icon="User" />
                </el-steps>
                <div style="text-align: center;padding: 1em;margin-top: 1em;">
                    <el-button type="primary" style="width: 100%;" plain @click="handleLogin">立即登录</el-button>

                </div>
            </div>
            <div v-if="!isUnauthorized">
                <div class="infoCard" style="text-align: center;">
                    <h3>{{ userStore.userInfo.nickname }}</h3>
                    <div style="margin-top: 2em;">
                        <ul style="list-style-type: none; padding: 0;">
                            <li style="display: flex; align-items: center; padding: 10px 0;">
                                <!-- 编辑图标 -->
                                <el-icon style="margin-right: 10px;">
                                    <Edit />
                                </el-icon>
                                <span>个人中心</span>
                            </li>

                            <!-- 分割线 -->
                            <el-divider direction="horizontal"></el-divider>

                            <li style="display: flex; align-items: center; padding: 10px 0;">
                                <!-- 浏览图标 -->
                                <el-icon style="margin-right: 10px;">
                                    <View />
                                </el-icon>
                                <span>最近浏览</span>
                            </li>
                        </ul>
                    </div>
                    <el-button type="danger " style="width: 100%;" plain @click="handleLogout">退出登录</el-button>
                </div>
            </div>
        </el-popover>
        <div class="toolsBar">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;

}

.login-button {
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #007bff;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    user-select: none;
}

.login-button:hover {
    background-color: #0056b3;
}

.user-avatar {
    cursor: pointer;
}

.register-link {
    color: #007bff;
    cursor: pointer;
}

.register-link:hover {
    text-decoration: underline;
}

.custom-popover {
    width: 35em;
    /* 自定义宽度 */
    padding: 15px;
    /* 自定义内边距 */
}
</style>
