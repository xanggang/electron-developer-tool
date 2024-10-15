<template>
  <div>
    <a-button @click="handleAdd">在数据库中插入一条数据</a-button>
    <a-button @click="handleGet">读取一条数据</a-button>
  </div>
</template>

<script lang="ts" setup>
import SysConfigDb from '@/db/config'

function handleAdd() {
  SysConfigDb.baseSet({
    sysConfigFilePath: '1',
    userConfigFilePath: '2',
    appRootPath: '3',
  })
}

async function handleGet() {
  const res = await SysConfigDb.baseGet()
  console.log(res)
}
</script>

<style scoped lang="less">

</style>
