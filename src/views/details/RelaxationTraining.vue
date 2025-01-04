<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Timer } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

interface TrainingItem {
    id: number;
    title: string;
    description: string;
    duration: string;
    type: string;
    imageUrl: string;
    bgColor: string;
}

const trainingList = ref<TrainingItem[]>([
    {
        id: 1,
        title: "呼吸冥想",
        description: "通过调节呼吸节奏，缓解压力和焦虑",
        duration: "10分钟",
        type: "冥想",
        imageUrl: new URL('@/assets/img/relax/huxi.png', import.meta.url).href,
        bgColor: "#E3F2FD"
    },
    {
        id: 2,
        title: "渐进式肌肉放松",
        description: "依次放松身体各个部位的肌肉，达到完全放松",
        duration: "15分钟",
        type: "身体放松",
        imageUrl: new URL('@/assets/img/relax/jirou.png', import.meta.url).href,
        bgColor: "#F3E5F5"
    },
    {
        id: 3,
        title: "正念行走",
        description: "在行走中体验当下，培养专注力",
        duration: "20分钟",
        type: "正念练习",
        imageUrl: new URL('@/assets/img/relax/walk.png', import.meta.url).href,
        bgColor: "#E8F5E9"
    },
    {
        id: 4,
        title: "安眠白噪音",
        description: "舒缓的自然声音，帮助入睡和放松",
        duration: "30分钟",
        type: "声音疗愈",
        imageUrl: new URL('@/assets/img/relax/music.png', import.meta.url).href,
        bgColor: "#FFF3E0"
    },
    {
        id: 5,
        title: "瑜伽放松",
        description: "通过瑜伽动作，达到身心放松",
        duration: "25分钟",
        type: "身体放松",
        imageUrl: new URL('@/assets/img/relax/yoga.png', import.meta.url).href,
        bgColor: "#F3E5F5"
    },
    {
        id: 6,
        title: "正念跑步",
        description: "通过专注呼吸，达到身心放松",
        duration: "15分钟",
        type: "正念练习",
        imageUrl: new URL('@/assets/img/relax/mi.png', import.meta.url).href,
        bgColor: "#E8F5E9"
    }
]);

const currentCategory = ref('全部');
const categories = ['全部', '冥想', '身体放松', '正念练习', '声音疗愈'];

const filteredTrainingList = computed(() => {
    if (currentCategory.value === '全部') {
        return trainingList.value;
    }
    return trainingList.value.filter(item => item.type === currentCategory.value);
});

const router = useRouter();

const startTraining = (item: TrainingItem) => {
    if (item.type === '声音疗愈') {
        router.push('/sound-healing');
    } else {
        router.push(`/relaxation/${item.title}/${item.id}`);
    }
};
</script>

<template>
    <div class="relaxation-container">
        <div class="header">
            <h1>放松训练</h1>
            <p class="subtitle">找到内心的平静，享受当下的宁静时刻</p>
        </div>

        <div class="categories">
            <button v-for="category in categories" :key="category"
                :class="['category-btn', { active: currentCategory === category }]" @click="currentCategory = category">
                {{ category }}
            </button>
        </div>

        <div class="training-grid">
            <div v-for="item in filteredTrainingList" :key="item.id" class="training-card"
                :style="{ backgroundColor: item.bgColor }" @click="startTraining(item)">
                <div class="card-content">
                    <h3>{{ item.title }}</h3>
                    <p class="description">{{ item.description }}</p>
                    <div class="meta-info">
                        <span class="duration">
                            <el-icon>
                                <Timer />
                            </el-icon>
                            {{ item.duration }}
                        </span>
                        <span class="type">{{ item.type }}</span>
                    </div>
                </div>
                <div class="card-image">
                    <img :src="item.imageUrl" :alt="item.title">
                </div>
            </div>
        </div>

        <div class="daily-quote">
            <blockquote>
                平静不是避免风浪，而是在风浪中保持内心的宁静
            </blockquote>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.relaxation-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    .header {
        text-align: center;
        margin-bottom: 3rem;

        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            margin-top: 1.1em;
            font-size: 1.1rem;
            color: #666;
        }
    }

    .categories {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;

        .category-btn {
            padding: 0.5rem 1.5rem;
            border: none;
            border-radius: 20px;
            background-color: #f5f5f5;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: #e0e0e0;
            }

            &.active {
                background-color: #2c3e50;
                color: white;
            }
        }
    }

    .training-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;

        .training-card {
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            min-height: 200px;
            display: flex;
            padding: 1.5rem;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }

            .card-content {
                flex: 1;
                z-index: 1;

                h3 {
                    font-size: 1.4rem;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .description {
                    color: #666;
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .meta-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    .duration {
                        display: flex;
                        align-items: center;
                        gap: 0.3rem;
                        color: #666;
                    }

                    .type {
                        padding: 0.2rem 0.8rem;
                        background-color: rgba(0, 0, 0, 0.1);
                        border-radius: 12px;
                        font-size: 0.9rem;
                    }
                }
            }

            .card-image {
                position: absolute;
                right: -20px;
                bottom: -20px;
                width: 150px;
                height: 150px;
                opacity: 0.2;
                transition: opacity 0.3s ease;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &:hover .card-image {
                opacity: 0.3;
            }
        }
    }

    .daily-quote {
        text-align: center;
        margin-top: 3rem;
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 10px;

        blockquote {
            font-size: 1.2rem;
            color: #2c3e50;
            font-style: italic;
            margin: 0;

            &::before {
                content: '"';
                font-size: 2rem;
                color: #666;
            }

            &::after {
                content: '"';
                font-size: 2rem;
                color: #666;
            }
        }
    }
}

@media (max-width: 768px) {
    .relaxation-container {
        padding: 1rem;

        .training-grid {
            grid-template-columns: 1fr;
        }

        .categories {
            flex-wrap: wrap;
        }
    }
}
</style>