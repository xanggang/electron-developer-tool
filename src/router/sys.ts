
// Basic routing without permission
const sysSetting = [
  {
    path: '/sys/f',
    component: () => import('@/views/sys/index1.vue'),
    meta: { title: '后台管理' },
    children: []
  },
]

export default sysSetting
