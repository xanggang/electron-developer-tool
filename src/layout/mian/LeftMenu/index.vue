<template>
  <div class="app-left-menu">
    <a-menu
        class="menu"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 200px"
        mode="inline"
        :items="items"
        @click="handleClick"
    ></a-menu>
  </div>

</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { MenuProps, ItemType } from 'ant-design-vue'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

const items: ItemType[] = reactive([
  {
    key: '1',
    icon: '',
    label: '项目管理',
    type: '',
  },
  {
    key: '2',
    icon: '',
    label: '自启动',
    type: '',
  },
  {
    key: '3',
    icon: '',
    label: '开发工具箱',
    type: '',
  }
])

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e)
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
