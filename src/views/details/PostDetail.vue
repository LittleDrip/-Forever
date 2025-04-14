<!-- 帖子详情页 -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Clock, Message, Star } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user'
import { addCommentService, getCommentsService } from '@/api/postsComment';
import { getPostByIdService } from '@/api/posts';
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const route = useRoute();
const router = useRouter();
const postId = ref(route.params.id);

onMounted(async () => {
    let res = await getPostByIdService(postId.value);
    post.value = res.data;
})

// 模拟数据 - 实际应用中应该从API获取
const post = ref({
    id: '',
    title: '',
    category: '',
    content: '',
    authorName: '',
    authorAvatarUrl: '',
    createdAt: '',
});

// 模拟评论数据
const comments = ref([
    {
        id: '',
        authorName: '',
        authorAvatarUrl: '',
        content: '',
        createdAt: '',
    }
]);
onMounted(async () => {
    let res = await getCommentsService(postId.value);
    comments.value = res.data;
})

// 新评论
const newComment = ref('');

// 提交评论
const submitComment = async () => {
    if (!newComment.value.trim()) return;

    // 在实际应用中，这里应该是一个API调用
    comments.value.unshift({
        id: Date.now(),
        authorName: userInfo.nickname,
        authorAvatarUrl: userInfo.avatar,
        content: newComment.value,
        createdAt: new Date().toISOString(),
    });

    const comment = {
        postId: postId.value,
        content: newComment.value,
        authorName: userInfo.nickname,
        authorAvatarUrl: userInfo.avatar,
    }
    console.log(comment);
    const res = await addCommentService(comment);
    console.log(res);

    newComment.value = '';
};

// 返回论坛
const backToForum = () => {
    router.push('/Forum');
};


// 格式化日期
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<template>
    <div class="post-detail-container">
        <!-- 顶部返回按钮 -->
        <div class="back-button" @click="backToForum">
            <el-button type="text" size="large">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
                返回论坛
            </el-button>
        </div>

        <!-- 帖子内容卡片 -->
        <el-card class="post-card" shadow="hover">
            <!-- 帖子头部：标题和分类 -->
            <div class="post-header">
                <el-tag size="large" type="success">{{ post.category }}</el-tag>
                <h1 class="post-title">{{ post.title }}</h1>

            </div>

            <!-- 作者信息 -->
            <div class="author-info">
                <el-avatar :size="50" :src="post.authorAvatarUrl" />
                <div class="author-details">
                    <span class="author-name">{{ post.authorName }}</span>
                    <span class="post-time">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        {{ formatDate(post.createdAt) }}
                    </span>
                </div>
            </div>

            <!-- 帖子内容 -->
            <div class="post-content" v-html="post.content"></div>
        </el-card>

        <!-- 评论区 -->
        <el-card class="comments-section" shadow="hover">
            <template #header>
                <div class="comments-header">
                    <el-icon>
                        <Message />
                    </el-icon>
                    <span>评论 ({{ comments.length }})</span>
                </div>
            </template>

            <!-- 发表评论 -->
            <div class="comment-form">
                <el-input v-model="newComment" type="textarea" :rows="3" placeholder="分享你的看法..." resize="none" />
                <el-button type="primary" @click="submitComment" :disabled="!newComment.trim()">
                    发表评论
                </el-button>
            </div>

            <!-- 评论列表 -->
            <div class="comments-list">
                <el-empty v-if="comments.length === 0" description="暂无评论" />
                <div v-else v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-header">
                        <el-avatar :size="40" :src="comment.authorAvatarUrl" />
                        <div class="comment-details">
                            <div class="comment-author-name">{{ comment.authorName }}</div>
                            <div class="comment-time">
                                <el-icon>
                                    <Clock />
                                </el-icon>
                                <span>{{ new Date(comment.createdAt).toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>
                    <div style="font-size: 1.4em;" class="comment-content">{{ comment.content }}</div>
                </div>
            </div>

        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.comments-list {
    width: 100%;
}

.comment-item {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 控制头像和文字的间距 */
}

.comment-details {
    display: flex;
    flex-direction: column;
}

.comment-author-name {
    font-size: 1.4em;
    font-weight: bold;
}

.comment-time {
    font-size: 1.2em;
    color: grey;
    margin-top: 0.3em;
    display: flex;
    align-items: center;
}

.comment-time span {
    margin-left: 5px;
}

.comment-content {
    margin-left: 50px;
    /* 保持与作者名称对齐 */
    font-size: 1.2em;
    margin-top: 5px;
    line-height: 1.5;
}

.post-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.back-button {
    margin-bottom: 16px;

    .el-button {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
    }
}

.post-card {
    margin-bottom: 24px;
    border-radius: 8px;
    overflow: hidden;
}

.post-header {
    margin-bottom: 20px;

    .post-title {
        margin: 16px 0;
        font-size: 28px;
        font-weight: bold;
        color: #333;
    }

    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;

        .tag {
            border-radius: 16px;
        }
    }
}

.author-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;

    .author-details {
        margin-left: 12px;
        display: flex;
        flex-direction: column;

        .author-name {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }

        .post-time {
            font-size: 14px;
            color: #999;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 5px;
        }
    }
}

.post-content {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    margin-bottom: 24px;

    p {
        margin-bottom: 16px;
    }

    h3 {
        margin: 24px 0 16px;
        font-size: 20px;
        font-weight: bold;
        color: #333;
    }
}

.comments-section {
    border-radius: 8px;

    .comments-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: bold;
    }
}

.comment-form {
    margin-bottom: 24px;

    .el-button {
        margin-top: 12px;
        float: right;
    }
}



@media (max-width: 768px) {
    .post-detail-container {
        padding: 12px;
    }

    .post-header {
        .post-title {
            font-size: 24px;
        }
    }

    .post-content {
        font-size: 15px;
    }
}
</style>