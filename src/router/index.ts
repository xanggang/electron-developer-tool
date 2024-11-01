import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import sysSetting from './sysSetting'
import sys from './sys'

// 404 on a page
// const PAGE_NOT_FOUND_ROUTE =    {
//   path: '/:path(.*)*',
//   name: '404',
//   component: EXCEPTION_COMPONENT,
//   meta: {
//     title: 'ErrorPage',
//     hideBreadcrumb: true,
//     hideMenu: true
//   }
// }

// app router
export const router = createRouter({
  end: undefined, sensitive: undefined,
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  // history: createWebHashHistory(),
  routes: [
    ...sysSetting,
    ...sys,
    {
      path: '/',
      redirect: '/sys/a',
    }
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
