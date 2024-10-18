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
  const res = await window.ipcRenderer.invoke('dialog:openFile')
  console.log(res)
}

async function updateData() {
  // db.friends.add({
  //   name: 'zhang san',
  //   age: '23'
  // });
}

async function openFolder() {
  const res = await window.ipcRenderer.invoke('getFilePath', 'D:\\')
  console.log(res)
}

async function writeFile() {
  const res = await window.ipcRenderer.invoke('writeFileByPath', 'E:\\down\\测试文件写入1.txt', '111')
  console.log(res)
}

async function openProject() {
  const res = await window.ipcRenderer.invoke('openProject')
  console.log(res)
}
</script>

<style scoped lang="less">

</style>
