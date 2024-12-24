<template>
  <div>
    <a-button @click="sendMessage">向主进程发送笑死</a-button>
    <a-button @click="updateData">边际</a-button>
    <a-button @click="openFolder">openFolder</a-button>
    <a-button @click="writeFile">写一个文件</a-button>
    <a-button @click="openProject">打开项目</a-button>
  </div>
</template>

<script lang="ts" setup>
async function sendMessage() {
  await window.ipcRenderer.invoke('dialog:openFile')
}

async function updateData() {
  // db.friends.add({
  //   name: 'zhang san',
  //   age: '23'
  // });
}

async function openFolder() {
  await window.ipcRenderer.invoke('getFilePath', 'D:\\')
}

async function writeFile() {
  await window.ipcRenderer.invoke('writeFileByPath', 'E:\\down\\测试文件写入1.txt', '111')
}

async function openProject() {
  await window.ipcRenderer.invoke('openProject')
}
</script>

<style scoped lang="less">

</style>
