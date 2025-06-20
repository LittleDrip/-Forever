<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import { updateUserInfoService } from '@/api/user';
import router from '@/router';

const userStore = useUserStore();
const nickname = ref('');
const avatar = ref('');
const dialogVisible = ref(false);

// 确保 avatarList 中的链接是有效的图片链接
const avatarList = [
    'https://pic1.imgdb.cn/item/6801e66d88c538a9b5daef83.png',
    'https://pic1.imgdb.cn/item/6801e74a88c538a9b5daefe3.png',
    'https://pic1.imgdb.cn/item/6801e77388c538a9b5daeff0.png',
    'https://pic1.imgdb.cn/item/6801e79d88c538a9b5daf017.png',
    'https://pic1.imgdb.cn/item/6801e7b488c538a9b5daf028.png',
    'https://pic1.imgdb.cn/item/6801e7c988c538a9b5daf02d.png',
    'https://pic1.imgdb.cn/item/6801e7e488c538a9b5daf035.png'
];

onMounted(() => {
    nickname.value = userStore.userInfo.nickname || '';
    avatar.value = userStore.userInfo.avatar || '';
});

const handleUpdate = async () => {
    try {
        const res = await updateUserInfoService(nickname.value, avatar.value);
        if (res) {
            // 更新 userStore 中的用户信息
            userStore.saveUserInfo({
                ...userStore.userInfo,
                nickname: nickname.value,
                avatar: avatar.value
            });
            ElMessage.success('更新成功');
            router.push("/commonSense");
        }
    } catch (error) {
        ElMessage.error('更新失败，请稍后重试');
    }
};

const selectAvatar = (selectedAvatar: string) => {
    avatar.value = selectedAvatar;
    dialogVisible.value = false;
};
</script>

<template>
    <div class="user-center">
        <el-card class="user-card">
            <template #header>
                <div class="card-header">
                    <span>个人中心</span>
                </div>
            </template>

            <div class="user-info">
                <div class="avatar-section">
                    <el-avatar :size="100" :src="avatar" />
                    <el-button type="primary" @click="dialogVisible = true">选择头像</el-button>
                </div>

                <div class="nickname-section">
                    <el-form label-width="80px">
                        <el-form-item label="昵称">
                            <el-input v-model="nickname" placeholder="请输入昵称" />
                        </el-form-item>
                    </el-form>
                </div>

                <div class="action-section">
                    <el-button type="primary" @click="handleUpdate">保存修改</el-button>
                </div>
            </div>
        </el-card>

        <el-dialog v-model="dialogVisible" title="选择头像" width="600px">
            <div class="avatar-grid">
                <div v-for="(item, index) in avatarList" :key="index" class="avatar-item"
                    :class="{ 'avatar-selected': avatar === item }" @click="selectAvatar(item)">
                    <el-avatar :size="80" :src="item" />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.user-center {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 20px;
}

.user-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.user-info {
    .avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
    }

    .nickname-section {
        margin-bottom: 30px;
    }

    .action-section {
        display: flex;
        justify-content: center;
    }
}

.avatar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
}

.avatar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
        background-color: #f5f7fa;
        transform: scale(1.05);
    }

    &.avatar-selected {
        border: 2px solid #409eff; // 选中效果
    }
}
</style>