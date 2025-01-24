import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import MainLayout from '@/render/layout/main/index.vue'

// app router
export const router = createRouter({
  end: undefined,
  sensitive: undefined,
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      redirect: '/home/index',
      component: MainLayout,
      children: [
        {
          path: '/home/index',
          component: () => import('@/render/views/home/index.vue'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
