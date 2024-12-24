<template>
  <div class="app-setting-card">
    <div
      class="icon-wrap"
      :class="{active: active === item.id}"
      @click="handleSelect(item)"
      v-for="(item, index) in appList"
      :key="index"
    >
      <img :src="item.icon" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllStarter } from '@/ipc/starter'

interface IStarter {
  id: number
}

const appList = ref<any[]>([])
const active = defineModel('active', { type: [Number, String] })

async function getAppList() {
  appList.value = await getAllStarter()
}

onMounted(getAppList)

function handleSelect(item: IStarter) {
  active.value = item.id
}

</script>

<style scoped lang="less">

.app-setting-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  .icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ececec;

    &.active {
      border-color: #ebedf1;
      background: #ebedf1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
