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
          component: () => import('../components/meunContent/CommonSense.vue'),
        },
        {
          path: '/diagnosticTests',
          name: '诊断测试',
          component: () => import('../components/meunContent/DiagnosticTests.vue'),
        }
      ]
    },


  ],
})

export default router
