import Layout from '@/layout/mian/index.vue'
// Basic routing without permission
const sysSetting = [

  {
    path: '/sys',
    component: Layout,
    meta: { title: '后台管理' },
    children: [
      {
        path: '/sys/f',
        component: () => import('@/views/sys/index1.vue'),
        meta: { title: '后台管理' },
        children: [],
      },
      // {
      //   path: '/sys/db',
      //   component: () => import('@/views/sys/db.vue'),
      //   meta: { title: '后台管理' },
      //   children: []
      // },
    ],
  },

]

export default sysSetting
