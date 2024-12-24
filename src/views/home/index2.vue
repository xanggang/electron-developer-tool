<template>
  <div>
    <a-button @click="go">go a</a-button>
  </div>
</template>

<script lang="ts" setup>

const { push } = useRouter()

function go() {
  push('/a')
}
</script>

<style scoped lang="less">

</style>
