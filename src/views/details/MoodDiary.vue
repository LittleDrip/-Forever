<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { getDiaryList, createDiary, updateDiary, deleteDiary } from '@/api/diary';
import router from '@/router';

interface DiaryEntry {
    id: number;
    date: string;
    mood: string;
    content: string;
    weather: string;
}

const diaryEntries = ref<DiaryEntry[]>([]);
const showNewDiary = ref(false);
const currentMood = ref('happy');
const currentWeather = ref('sunny');
const diaryContent = ref('');
const isEditing = ref(false);
const editingDiaryId = ref<number | null>(null);
const loading = ref(false);

const moodOptions = [
    { value: 'happy', label: '开心 😊' },
    { value: 'sad', label: '难过 😢' },
    { value: 'excited', label: '兴奋 🎉' },
    { value: 'angry', label: '生气 😠' },
    { value: 'neutral', label: '平静 😐' },
];

const weatherOptions = [
    { value: 'sunny', label: '晴朗 ☀️' },
    { value: 'cloudy', label: '多云 ☁️' },
    { value: 'rainy', label: '下雨 🌧️' },
    { value: 'snowy', label: '下雪 🌨️' },
];

const loadDiaries = async () => {
    try {
        loading.value = true;
        const res = await getDiaryList();
        if (res.code === 200) {
            diaryEntries.value = res.data;
        }
    } catch (error) {
        ElMessage.error('获取日记列表失败');
    } finally {
        loading.value = false;
    }
};

const toggleNewDiary = () => {
    showNewDiary.value = !showNewDiary.value;
    if (!showNewDiary.value) {
        resetForm();
    }
};

const resetForm = () => {
    currentMood.value = 'happy';
    currentWeather.value = 'sunny';
    diaryContent.value = '';
    isEditing.value = false;
    editingDiaryId.value = null;
};

const startEditing = (entry: DiaryEntry) => {
    isEditing.value = true;
    editingDiaryId.value = entry.id;
    currentMood.value = entry.mood;
    currentWeather.value = entry.weather;
    diaryContent.value = entry.content;
    showNewDiary.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const saveDiary = async () => {
    if (!diaryContent.value.trim()) {
        ElMessage.warning('请输入日记内容');
        return;
    }

    const diaryData = {
        mood: currentMood.value,
        weather: currentWeather.value,
        content: diaryContent.value.trim()
    };

    try {
        if (isEditing.value && editingDiaryId.value !== null) {
            // 更新日记
            const res = await updateDiary(editingDiaryId.value, diaryData);
            if (res.code === 200) {
                ElMessage.success('更新成功');
                await loadDiaries(); // 重新加载日记列表
            }
        } else {
            // 创建新日记
            const res = await createDiary(diaryData);
            if (res.code === 200) {
                ElMessage.success('保存成功');
                await loadDiaries(); // 重新加载日记列表
            }
        }
        toggleNewDiary();
        resetForm();
    } catch (error) {
        ElMessage.error(isEditing.value ? '更新失败' : '保存失败');
    }
};

const deleteDiaryEntry = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定要删除这篇日记吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });

        const res = await deleteDiary(id);
        if (res.code === 200) {
            ElMessage.success('删除成功');
            await loadDiaries(); // 重新加载日记列表
        }
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('删除失败');
        }
    }
};

const analyzeDiary = () => {
    ElMessage.info('智能分析功能尚未实现');
};
const goBack = () => {
    router.back();
};

// 初始加载数据
onMounted(() => {
    loadDiaries();
});
</script>

<template>
    <div class="back-button" @click="goBack">
        <svg t="1710747179070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4250" width="32" height="32">
            <path
                d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.052938-18.416442-49.91597-18.416442-68.968908 0L291.910961 480.275316c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.439172 345.70441c19.052938 18.416442 49.91597 18.416442 68.968908 0 19.052938-18.416442 19.052938-48.273447 0-66.660212L395.21518 513.604544z"
                p-id="4251"></path>
        </svg>
        返回
    </div>
    <div class="diary-container">
        <div class="diary-header">
            <h2>{{ isEditing ? '编辑日记' : '我的心情日记' }}</h2>
            <div class="button-group" v-if="!showNewDiary && !isEditing">
                <el-button type="primary" :icon="Plus" @click="toggleNewDiary">
                    写日记
                </el-button>
                <!-- <el-button type="success" @click="analyzeDiary">
                    智能分析
                </el-button> -->
            </div>
        </div>

        <div v-if="showNewDiary" class="new-diary-form">
            <div class="form-header">
                <div class="mood-weather-select">
                    <el-select v-model="currentMood" placeholder="选择心情">
                        <el-option v-for="item in moodOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-select v-model="currentWeather" placeholder="选择天气">
                        <el-option v-for="item in weatherOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>
            <el-input v-model="diaryContent" type="textarea" :rows="6" placeholder="写下今天的心情..." />
            <div class="form-footer">
                <el-button @click="toggleNewDiary">取消</el-button>
                <el-button type="primary" @click="saveDiary" :loading="loading">
                    {{ isEditing ? '更新' : '保存' }}
                </el-button>
            </div>
        </div>

        <el-empty v-if="diaryEntries.length === 0" description="还没有写过日记呢" />

        <div v-else class="diary-list" v-loading="loading">
            <div v-for="entry in diaryEntries" :key="entry.id" class="diary-card">
                <div class="diary-card-header">
                    <span class="date">{{ entry.date }}</span>
                    <div class="diary-icons">
                        <el-icon class="edit-icon" @click="startEditing(entry)">
                            <Edit />
                        </el-icon>
                        <el-icon class="delete-icon" @click="deleteDiaryEntry(entry.id)">
                            <Delete />
                        </el-icon>
                    </div>
                </div>
                <div class="diary-info">
                    <span>心情：{{ moodOptions.find(m => m.value === entry.mood)?.label }}</span>
                    <span>天气：{{ weatherOptions.find(w => w.value === entry.weather)?.label }}</span>
                </div>
                <div class="diary-content">{{ entry.content }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.back-button {
    display: flex;
    align-items: center;
    gap: 5px;
    position: absolute;
    font-size: 1.2rem;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    margin-bottom: 15px;
    color: #666;
    transition: all 0.3s ease;

    &:hover {
        color: #E8D575;
        transform: translateX(-5px);
    }

    svg {
        width: 24px;
        height: 24px;
    }
}

.diary-container {
    max-width: 800px;
    min-height: 92.5vh;
    margin: 0 auto;
    padding: 20px;

    .diary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h2 {
            margin: 0;
            color: #333;
        }

        .el-button--primary {
            background-color: #e8d575;
            border-color: #e8d575;

            &:hover,
            &:focus {
                background-color: #f0e08f;
                border-color: #f0e08f;
            }
        }
    }

    .new-diary-form {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;

        .form-header {
            margin-bottom: 16px;

            .mood-weather-select {
                display: flex;
                gap: 16px;
                margin-bottom: 16px;

                .el-select {
                    .el-input__wrapper.is-focus {
                        box-shadow: 0 0 0 1px #e8d575 inset;
                    }
                }
            }
        }

        .el-textarea__inner:focus {
            box-shadow: 0 0 0 1px #e8d575 inset;
        }

        .form-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 16px;

            .el-button--primary {
                background-color: #e8d575;
                border-color: #e8d575;

                &:hover,
                &:focus {
                    background-color: #f0e08f;
                    border-color: #f0e08f;
                }
            }
        }
    }

    .diary-list {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .diary-card {
            background-color: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid transparent;

            &:hover {
                transform: translateY(-2px);

                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .diary-card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;

                .date {
                    font-size: 14px;
                    color: #666;
                }

                .diary-icons {
                    display: flex;
                    gap: 8px;

                    .edit-icon,
                    .delete-icon {
                        cursor: pointer;
                        font-size: 1.5em;


                        &:hover {
                            // 加上动画
                            transition: all 0.1s ease;
                            transform: scale(1.1);

                        }
                    }

                    .edit-icon {
                        color: #e8d575;
                    }

                    .delete-icon {
                        color: #ff4d4f;
                    }
                }
            }

            .diary-info {
                display: flex;
                gap: 16px;
                margin-bottom: 12px;
                font-size: 14px;
                color: #666;
            }

            .diary-content {
                color: #333;
                line-height: 1.6;
            }
        }
    }
}
</style>