<template>
  <div class="app-container">
    <Header></Header>
    <div class="app-body">
      <Menu class="app-menu"></Menu>
      <div class="app-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../Header/index.vue'
import Menu from '../Menu/index.vue'
</script>

<style scoped lang="less">
.app-container  {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .app-body {
    width: 100%;
    height: calc(100vh - var(--appHeaderHeight, 54px));
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .app-menu {
      flex-shrink: 1;
    }

    .app-center {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
