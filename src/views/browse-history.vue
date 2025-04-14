<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { View, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { clearBrowsingHistory, getUserBrowsingHistory } from '@/api/history';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();



// const historyList = ref<BrowseHistory[]>([])
const historyList = ref([
    {
        id: '',
        articleTitle: '',
        viewTime: ''
    }

]);
// 获取浏览历史列表
const fetchHistoryList = async () => {
    try {
        const res = await getUserBrowsingHistory(userStore.userInfo.id)
        historyList.value = res.data
    } catch (error) {
        console.error('获取浏览历史失败:', error)
    }
}


const clearAll = async () => {
    try {
        await clearBrowsingHistory()
        ElMessage.success('清空成功')
        historyList.value = []
    } catch (error) {
        console.error('清空失败:', error)
    }
}

onMounted(() => {
    fetchHistoryList()
})
</script>

<template>
    <div class="browse-history">
        <div class="header">
            <h1>最近浏览</h1>
            <el-button type="danger" plain @click="clearAll">
                <el-icon>
                    <Delete />
                </el-icon>
                清空记录
            </el-button>
        </div>

        <div class="history-list">
            <el-empty v-if="historyList[0].id === ''" description="暂无浏览记录" />

            <div v-else class="history-items">
                <div v-for="item in historyList" :key="item.id" class="history-item">
                    <div class="content">
                        <div class="title-row">
                            <h3>{{ item.articleTitle }}</h3>
                            <el-tag size="small" type="warning">文章</el-tag>
                        </div>
                        <div class="meta">
                            <el-icon>
                                <View />
                            </el-icon>
                            <span>{{ item.viewTime }}</span>
                        </div>
                    </div>
                    <div class="actions">
                        <el-button type="danger" circle @click="handleDelete(item.id)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.browse-history {
    padding: 2rem;
    min-height: 100vh;
    background-color: #f5f5f5;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
            color: #333;
            font-size: 1.8rem;
            font-weight: 600;
        }
    }

    .history-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .history-item {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
            transform: translateX(5px);
        }

        .content {
            flex: 1;
            margin-right: 1rem;

            .title-row {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 0.5rem;

                h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: #333;
                }
            }

            .meta {
                display: flex;
                align-items: center;
                color: #999;
                font-size: 0.9rem;

                .el-icon {
                    margin-right: 4px;
                }
            }
        }

        .actions {
            display: flex;
            align-items: center;
        }
    }
}
</style>