<template>
  <div>
    <a-button @click="go">go b</a-button>
    <a-button @click="go">go b</a-button>
    <a-button @click="go1">系统功能</a-button>
    <a-button @click="go2">数据库操作</a-button>
  </div>
</template>

<script lang="ts" setup>

const { push } = useRouter()

function go() {
  push('/b')
}
function go1() {
  push('/sys/f')
}

function go2() {
  push('/sys/db')
}

function createFileSys() {

}
</script>

<style scoped lang="less">

</style>
