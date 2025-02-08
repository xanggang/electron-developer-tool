<template>
  <div class="app">
    <a-config-provider
      :theme="themeConfig"
    >
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { isDark, primary } from '@/render/theme'

const themeConfig = computed(() => {
  return {
    token: { colorPrimary: primary },
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }
})
</script>

<style lang="less">

.app {
  width: 100vw;
  height: 100vh;
}
</style>
