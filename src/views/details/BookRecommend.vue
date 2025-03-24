<template>
    <div class="book-recommend">
        <div class="header">
            <el-button style="font-size: 1rem;" @click="goBack" text :icon="Back">
                返回
            </el-button>
            <h1>心理健康书籍推荐</h1>
        </div>

        <div class="categories">
            <el-tabs v-model="activeCategory" class="category-tabs">
                <el-tab-pane v-for="category in categories" :key="category.id" :label="category.name"
                    :name="category.id">
                    <div class="books-container">
                        <div v-for="book in category.books" :key="book.id" class="book-card">
                            <div class="book-cover">
                                <img :src="getProxyUrl(book.cover)" :alt="book.title" />
                                <div class="book-overlay">
                                    <h3>{{ book.title }}</h3>
                                    <p class="author">{{ book.author }}</p>
                                    <div class="description">
                                        {{ book.description }}
                                    </div>
                                </div>
                            </div>
                            <div class="book-info">
                                <h3>{{ book.title }}</h3>
                                <p class="author">{{ book.author }}</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';

const router = useRouter();
const activeCategory = ref('1');

const categories = [
    {
        "id": "1",
        "name": "心理健康指南",
        "books": [
            {
                "id": 1,
                "title": "被讨厌的勇气",
                "author": "岸见一郎/古贺史健",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s29237648.jpg",
                "description": "阿德勒心理学入门书籍，讲述如何获得真正的幸福和自由。"
            },
            {
                "id": 2,
                "title": "也许你该找个人聊聊",
                "author": "洛莉·戈特利布",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s32210371.jpg",
                "description": "一位心理治疗师的回忆录，讲述了发生在诊室中的故事，帮助读者了解心理治疗的过程和意义。"
            },
            {
                "id": 3,
                "title": "不原谅也没关系",
                "author": "皮特·沃克",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s33579104.jpg",
                "description": "关于复杂性创伤后压力综合征的自我疗愈指南，帮助读者理解创伤的影响并提供应对策略。"
            },
            {
                "id": 4,
                "title": "西方心理咨询经典案例集",
                "author": "徐光兴",
                "cover": "https://img3.doubanio.com/view/subject/l/public/s5702153.jpg",
                "description": "关于复杂性创伤后压力综合征的自我疗愈指南，帮助读者理解创伤的影响并提供应对策略。"
            }, {
                "id": 5,
                "title": "自卑与超越",
                "author": "阿尔弗雷德·阿德勒",
                "cover": "https://img1.doubanio.com/view/subject/l/public/s34989828.jpg",
                "description": "阿德勒心理学入门书籍，讲述如何获得真正的幸福和自由。"
            },
            {
                "id": 6,
                "title": "重塑心灵",
                "author": "许宜铭",
                "cover": "https://img9.doubanio.com/view/subject/l/public/s6017104.jpg",
                "description": "帮助读者了解心理咨询的本质，以及如何通过心理咨询实现自我成长和改变。"
            },
            {
                "id": 7,
                "title": "少有人走的路",
                "author": "斯科特·派克",
                "cover": "https://img2.doubanio.com/view/subject/l/public/s2144391.jpg",
                "description": "斯科特·派克在书中提出了自律的概念，帮助读者理解如何通过自律实现自我成长和改变。"
            },
        ]
    },
    {
        "id": "2",
        "name": "情绪管理",
        "books": [
            {
                "id": 1,
                "title": "情绪传染",
                "author": "伊莱恩·哈特菲尔德/约翰·卡乔波/理查德·拉普森",
                "cover": "https://img3.doubanio.com/view/subject/l/public/s34963362.jpg",
                "description": "探讨情绪如何在人与人之间传播，以及如何管理自身情绪以避免受到他人情绪的影响。"
            },
            {
                "id": 2,
                "title": "抑郁的力量",
                "author": "泉谷闲示",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s34911650.jpg",
                "description": "帮助读者理解抑郁症并找到摆脱抑郁的方法。"
            },
            {
                "id": 3,
                "title": "非暴力沟通",
                "author": "马歇尔·卢森堡",
                "cover": "https://img3.doubanio.com/view/subject/l/public/s29710777.jpg",
                "description": "帮助读者理解沟通的本质，以及如何通过沟通实现自我成长和改变。"
            },
            {
                "id": 4,
                "title": "拥抱你的敏感情绪",
                "author": "伊米·洛",
                "cover": "https://img3.doubanio.com/view/subject/l/public/s34943043.jpg",
                "description": "帮助读者理解情绪的本质，以及如何通过情绪实现自我成长和改变。"
            },
            {
                "id": 6,
                "title": "情绪的毒 身体知道",
                "author": "自凝心平",
                "cover": "https://img9.doubanio.com/view/subject/l/public/s33939364.jpg",
                "description": "本书阐述了情绪与身体健康之间的密切关系，提供了调节情绪的方法，如运动、冥想等，帮助读者维护身心健康。"
            },
            {
                "id": 7,
                "title": "如何控制负面情绪",
                "author": "约翰·A.辛德勒",
                "cover": "https://img3.doubanio.com/view/subject/l/public/s29779373.jpg",
                "description": "本书探讨了控制负面情绪的技巧和策略，如自我暗示、放松训练等，帮助读者在面对压力和挑战时保持情绪稳定。"
            },

        ]
    },
    {
        "id": "3",
        "name": "人际沟通",
        "books": [
            {
                "id": 6,
                "title": "蛤蟆先生去看心理医生",
                "author": "罗伯特·戴博德",
                "cover": "https://img1.doubanio.com/view/subject/s/public/s33941998.jpg",
                "description": "通过蛤蟆先生的心理咨询故事，向读者展示了如何通过沟通和理解改善人际关系。"
            },
            {
                "id": 7,
                "title": "社会心理学（第11版，精装彩印）",
                "author": "戴维·迈尔斯",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s27822589.jpg",
                "description": "深入探讨人际沟通的原理和技巧，帮助读者更好地理解他人并建立良好的人际关系。"
            }
        ]
    },
    {
        "id": "4",
        "name": "自我提升",
        "books": [
            {
                "id": 8,
                "title": "自伤自恋的精神分析",
                "author": "斋藤环",
                "cover": "https://img2.doubanio.com/view/subject/s/public/s34969161.jpg",
                "description": "探讨自恋与自伤的心理机制，帮助读者认识自我，实现自我提升和成长。"
            },
            {
                "id": 9,
                "title": "我们何以不同",
                "author": "王芳",
                "cover": "https://img9.doubanio.com/view/subject/s/public/s33852936.jpg",
                "description": "从人格心理学的角度，帮助读者了解自我，发现自身的独特之处，实现自我提升。"
            }
        ]
    },
    {
        "id": "5",
        "name": "压力管理",
        "books": [
            {
                "id": 10,
                "title": "早安，怪物",
                "author": "凯瑟琳·吉尔迪纳",
                "cover": "https://img3.doubanio.com/view/subject/s/public/s34798823.jpg",
                "description": "一位心理治疗师的回忆录，通过讲述来访者的故事，帮助读者理解压力的来源并学会有效管理压力。"
            },
            {
                "id": 11,
                "title": "不被支配",
                "author": "沙希达·艾拉比",
                "cover": "https://img2.doubanio.com/view/subject/l/public/s34885751.jpg",
                "description": "帮助读者识别和应对自恋人格，学会在压力下保持自我，不被他人所支配。"
            }
        ]
    }
];

const goBack = () => {
    router.back();
};

const getProxyUrl = (url: string) => {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
};
</script>

<style scoped lang="scss">
.book-recommend {
    padding: 2rem;
    background-color: #fafafa;
    min-height: 100vh;

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
            margin-left: 1rem;
            font-size: 2.2rem;
            color: #2c3e50;
            position: relative;
            padding-left: 0.5em;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 70%;
                background-color: #e8d575;
                border-radius: 2px;
            }
        }
    }

    .category-tabs {
        ::v-deep(.el-tabs__active-bar) {
            background-color: #e8d575;
        }

        ::v-deep(.el-tabs__item.is-active) {
            color: #e8d575;
        }

        ::v-deep(.el-tabs__item:hover) {
            color: #e8d575;
        }
    }

    .books-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1.5rem;
        padding: 1rem 0;
    }

    .book-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-5px);

            .book-overlay {
                opacity: 1;
                transform: translateY(0);
            }

            .book-cover img {
                transform: scale(1.05);
            }
        }

        .book-cover {
            position: relative;
            height: 300px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }

            .book-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.98);
                padding: 1.5rem;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                overflow-y: auto;
                display: flex;
                flex-direction: column;

                &::-webkit-scrollbar {
                    width: 4px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: rgba(232, 213, 117, 0.5);
                    border-radius: 2px;
                }
            }

            &:hover .book-overlay {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }

        .book-overlay {
            h3 {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 0.8rem;
                padding-bottom: 0.8rem;
                border-bottom: 2px solid #e8d575;
            }

            .author {
                color: #666;
                font-style: italic;
                font-size: 0.9rem;
                margin-bottom: 1.2rem;
            }

            .description {
                color: #2c3e50;
                font-size: 0.95rem;
                line-height: 1.6;
                text-align: justify;
                background: rgba(232, 213, 117, 0.1);
                padding: 1rem;
                border-radius: 8px;
                border-left: 3px solid #e8d575;
            }
        }

        .book-info {
            padding: 0.5rem 0.8rem;

            h3 {
                color: #2c3e50;
                margin: 0;
                font-size: 0.95rem;
            }

            .author {
                color: #666;
                margin: 0.3rem 0 0;
                font-style: italic;
                font-size: 0.85rem;
            }
        }
    }

    /* 响应式设计 */
    @media screen and (max-width: 1200px) {
        padding: 1.5rem;

        .header {
            h1 {
                font-size: 1.8rem;
            }
        }

        .books-container {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.2rem;
        }

        .book-card {
            .book-cover {
                height: 280px;
            }
        }
    }

    // 手机横屏特定样式
    @media screen and (max-height: 500px) and (orientation: landscape) {
        padding: 0.8rem;

        .header {
            margin-bottom: 0.5rem;

            h1 {
                font-size: 1.2rem;
            }
        }

        .books-container {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 0.8rem;
            padding: 0.5rem 0;
        }

        .book-card {
            .book-cover {
                height: 140px;
            }

            .book-overlay {
                padding: 0.6rem;

                h3 {
                    font-size: 0.9rem;
                    margin-bottom: 0.3rem;
                    padding-bottom: 0.3rem;
                }

                .author {
                    font-size: 0.75rem;
                    margin-bottom: 0.5rem;
                }

                .description {
                    font-size: 0.75rem;
                    padding: 0.5rem;
                    line-height: 1.3;
                }
            }

            .book-info {
                padding: 0.3rem 0.5rem;

                h3 {
                    font-size: 0.8rem;
                }

                .author {
                    font-size: 0.7rem;
                    margin-top: 0.2rem;
                }
            }
        }

        .category-tabs {
            ::v-deep(.el-tabs__header) {
                margin-bottom: 8px;
            }

            ::v-deep(.el-tabs__item) {
                font-size: 0.8rem;
                padding: 0 0.8rem;
                height: 32px;
                line-height: 32px;
            }
        }
    }

    // 平板和手机横屏
    @media screen and (max-width: 926px) {
        padding: 1rem;

        .header {
            margin-bottom: 1.5rem;

            h1 {
                font-size: 1.5rem;
            }
        }

        .books-container {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
        }

        .book-card {
            .book-cover {
                height: 250px;
            }

            .book-overlay {
                padding: 1rem;

                h3 {
                    font-size: 1.1rem;
                    margin-bottom: 0.6rem;
                    padding-bottom: 0.6rem;
                }

                .description {
                    font-size: 0.85rem;
                    padding: 0.8rem;
                }
            }

            .book-info {
                h3 {
                    font-size: 0.9rem;
                }

                .author {
                    font-size: 0.8rem;
                }
            }
        }
    }

    // 手机竖屏
    @media screen and (max-width: 768px) {
        padding: 0.8rem;

        .header {
            margin-bottom: 1rem;

            h1 {
                font-size: 1.3rem;
            }
        }

        .books-container {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.8rem;
        }

        .book-card {
            .book-cover {
                height: 220px;
            }

            .book-overlay {
                padding: 0.8rem;

                h3 {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    padding-bottom: 0.5rem;
                }

                .author {
                    font-size: 0.8rem;
                    margin-bottom: 0.8rem;
                }

                .description {
                    font-size: 0.8rem;
                    padding: 0.6rem;
                    line-height: 1.4;
                }
            }
        }

        .category-tabs {
            ::v-deep(.el-tabs__item) {
                font-size: 0.9rem;
                padding: 0 1rem;
            }
        }
    }

    // 超小屏幕
    @media screen and (max-width: 480px) {
        padding: 0.5rem;

        .header {
            h1 {
                font-size: 1.2rem;
            }
        }

        .books-container {
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.6rem;
        }

        .book-card {
            .book-cover {
                height: 180px;
            }

            .book-overlay {
                padding: 0.6rem;

                h3 {
                    font-size: 0.9rem;
                }

                .description {
                    font-size: 0.75rem;
                    padding: 0.5rem;
                }
            }

            .book-info {
                padding: 0.4rem 0.6rem;

                h3 {
                    font-size: 0.8rem;
                }

                .author {
                    font-size: 0.7rem;
                }
            }
        }

        .category-tabs {
            ::v-deep(.el-tabs__item) {
                font-size: 0.8rem;
                padding: 0 0.8rem;
            }
        }
    }
}
</style>