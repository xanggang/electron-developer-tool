<template>
  <div>
    <a-button @click="handleAdd">在数据库中插入一条数据</a-button>
    <a-button @click="handleGet">读取一条数据</a-button>
    <a-button @click="handleGetConfig">获取配置文件</a-button>
    <a-button @click="handleUpdateConfig">更新配置文件</a-button>
    <a-button @click="createFileSys">创建项目文件系统</a-button>
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

async function handleGetConfig() {
  const res = await window.ipcRenderer.invoke('getAppConfig')
  console.log(res)
}

async function handleUpdateConfig() {
  const res = await window.ipcRenderer.invoke('setAppConfig', { a: 1 })
  console.log(res)
}

async function createFileSys() {
  const res = await window.ipcRenderer.invoke('createFileSys', 'testa')
  console.log(res);
}
</script>

<style scoped lang="less">

</style>
