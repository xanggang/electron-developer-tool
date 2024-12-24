import Layout from '@/layout/mian/index.vue'

const project = [
  {
    path: '/project',
    component: Layout,
    meta: { title: '后台管理' },
    children: [
      {
        path: '/project/index',
        component: () => import('@/views/project/index.vue'),
        meta: { title: '后台管理' },
        children: [],
      },
    ],
  },
]

export default project
