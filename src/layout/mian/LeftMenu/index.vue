<template>
  <div class="app-left-menu">
    <a-menu
      class="menu"
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKeys"
      style="width: 200px"
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

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

const items = reactive([
  {
    key: '/project/index',
    icon: '',
    label: '项目管理',
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
  push(e.key)
}
</script>

<style lang="less" scoped>
.app-left-menu {
  width: 200px;
  flex-shrink: 0;
  height: 100%;
  background: #fff;

  .menu {
    width: 100%;
  }
}
</style>
