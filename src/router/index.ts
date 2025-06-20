import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { unauthorized } from '@/stores/token.ts';
import DiagnosticTests from '@/views/menu/DiagnosticTests.vue';
import BookRecommend from '@/views/details/BookRecommend.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/commonSense',
      children: [
        {
          path: '/commonSense',
          name: '心理常识',
          meta: { menuIndex: 0 },
          component: () => import('../views/menu/CommonSense.vue'),
        },
        {
          path: "/HotNews",
          name: "热点新闻",
          meta: { menuIndex: 1 },
          component: () => import('../views/menu/HotNews.vue')
        },
        {
          path: "/HotNews/:id",
          name: "NewsDetail",
          meta: { menuIndex: 1 },
          component: () => import('../views/menu/NewsDetail.vue')
        },
        {
          path: '/diagnosticTests',
          name: '诊断测试',
          meta: { menuIndex: 2 },
          component: DiagnosticTests,
          children: [
            {
              path: '/diagnosticTests/:id',
              name: '测试详情',
              component: () => import('../views/details/Quiz.vue'),
            },
            {
              path: '/diagnosticTests/:id/result',
              name: '测试结果',
              component: () => import('../views/details/QuizResult.vue'),
            }
          ]
        },
        {
          path: '/emotionalDivision',
          name: '跃心助手',
          meta: { menuIndex: 3 },
          component: () => import('../views/menu/EmotionalDivision.vue')
        },
        {
          path: "/Forum",
          name: "论坛信息",
          meta: { menuIndex: 4 },
          component: () => import('../views/menu/Forum.vue')
        },
        {
          path: "/Forum/post/:id",
          name: "帖子详情",
          meta: { menuIndex: 4 },
          component: () => import('../views/details/PostDetail.vue')
        },
        {
          path: "/HeartAssistant",
          name: "跃动助手",
          meta: { menuIndex: 3 },
          component: () => import('../views/menu/HeartAssistant.vue'),
        },
        {
          path: '/article',
          name: '文章',
          component: () => import('../views/details/ArticleDetail.vue'),
        },
        {
          path: '/HeartAssistant/chat',
          name: '聊天详情',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/ChatDetail.vue'),
        },

        {
          path: '/mildEmotion',
          name: '轻度情绪调节',
          meta: { menuIndex: 3 },
          component: () => import('../views/menu/MildEmotion.vue')
        },
        {
          path: '/relaxation',
          name: '放松训练',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/RelaxationTraining.vue')
        },
        {
          path: '/relaxation/:type/:id',
          name: '训练详情',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/TrainingDetail.vue')
        },
        {
          path: '/sound-healing',
          name: 'SoundHealing',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/SoundHealing.vue')
        },
        {
          path: '/books',
          name: 'BookRecommend',
          meta: { menuIndex: 3 },
          component: BookRecommend
        },
        {
          path: '/diary',
          name: '心情日记',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/MoodDiary.vue')
        },
        {
          path: '/story',
          name: '故事分享',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/StoryShare.vue')
        },
        {
          path: '/story/:id',
          name: '故事详情',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/StoryDetail.vue')
        },
        {
          path: '/IntelligentNavigation',
          name: '智能导航',
          meta: { menuIndex: 3 },
          component: () => import('../views/details/IntelligentNavigation.vue')
        },
        {
          path: '/browse-history',
          name: '浏览历史',
          component: () => import('../views/browse-history.vue')
        },
        {
          path: '/test',
          name: '1',
          component: () => import('../views/TestView2.vue')
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/user/Login.vue'),
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('../views/user/register.vue'),
    },
    {
      path: '/user-center',
      name: "个人中心",
      component: () => import('../views/user/user-center.vue')
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   const isUnauthorized = unauthorized()
//   if (to.name.startsWith('welcome') && !isUnauthorized) {
//     next('/index')
//   } else if (to.fullPath.startsWith('/index') && isUnauthorized) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
