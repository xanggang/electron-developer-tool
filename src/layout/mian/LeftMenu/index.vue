<template>
  <div class="app-left-menu">
    <a-menu
      class="menu"
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKeys"
      style="width: 120px"
      mode="inline"
      :items="items"
      @click="handleClick"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { MenuProps } from 'ant-design-vue'

const { push } = useRouter()

const selectedKeys = ref<string[]>(['/project/index'])
const openKeys = ref<string[]>(['sub1'])

const items = reactive([
  {
    key: '/project/index',
    icon: '',
    label: '项目管理',
    type: '',
  },
  {
    key: '/project/test',
    icon: '',
    label: '测试',
    type: '',
  },
  // {
  //   key: '2',
  //   icon: '',
  //   label: '自启动',
  //   type: '',
  // },
  // {
  //   key: '3',
  //   icon: '',
  //   label: '开发工具箱',
  //   type: '',
  // }
])

const handleClick: MenuProps['onClick'] = (e) => {
  push(e.key as string)
}
</script>

<style lang="less" scoped>
.app-left-menu {
  width: 120px;
  flex-shrink: 0;
  height: 100%;
  background: #fff;

  :deep(.ant-menu) {
    border: none;
  }

  .menu {
    width: 100%;
  }
}
</style>
