import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
          component: () => import('../views/menu/CommonSense.vue'),
        },
        {
          path: '/diagnosticTests',
          name: '诊断测试',
          component: () => import('../views/menu/DiagnosticTests.vue'),
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

export default router
