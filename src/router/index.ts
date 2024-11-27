import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { unauthorized } from '@/stores/token.ts';

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
          path: '/diagnosticTests',
          name: '诊断测试',
          meta: { menuIndex: 1 },
          component: () => import('../views/menu/DiagnosticTests.vue'),
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
          path: '/article',
          name: '文章',
          component: () => import('../views/details/ArticleDetail.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/user/Login.vue'),
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
