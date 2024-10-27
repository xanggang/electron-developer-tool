import Layout from '../components/Layout/index.vue'
const project = [
  {
    path: '/project',
    component: Layout,
    meta: {title: '后台管理'},
    children: [
      {
        path: '/index',
        component: () => import('@/views/project/index.vue'),
        meta: { title: '后台管理'},
        children: []
      }
    ]
  }
]

export default project
