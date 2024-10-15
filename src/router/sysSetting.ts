
// Basic routing without permission
const sysSetting = [
  {
    path: '/a',
    component: () => import('@/views/home/index1.vue'),
    meta: { title: '后台管理' },
    children: []
  },
  {
    path: '/b',
    component: () => import('@/views/home/index2.vue'),
    meta: { title: '后台管理' },
    children: []
  },
]

export default sysSetting
