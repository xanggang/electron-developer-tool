<template>
  <div class="app-main-layout">
    <Header></Header>
    <div class="app-content">
      <LeftMenu></LeftMenu>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header/index.vue'
import LeftMenu from './LeftMenu/index.vue'
</script>

<style scoped lang="less">

.app-main-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .app-content {
    width: 100%;
    height: 100%;
    background: paleturquoise;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .app-main {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 20px;
      background: #f0f2f5;
    }
  }
}
</style>
