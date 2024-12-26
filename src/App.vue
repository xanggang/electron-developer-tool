<template>
  <a-config-provider
    :theme="theme"
  >
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">

const theme = {
  token: { colorPrimary: '#0f50ab' },
}
</script>

<style lang="less">

</style>
