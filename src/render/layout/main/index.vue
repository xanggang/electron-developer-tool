<template>
  <div class="main-layout">
    <LeftMenu />
    <div class="main-layout-content">
      <MyHeader />
      <Center />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyHeader from './MyHeader.vue'
import LeftMenu from './Left.vue'
import Center from './Center.vue'

</script>

<style lang="less">

.main-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--color-bg-secondary);

  .main-layout-content-menu {
    width: 136px;
    height: 100%;
    background: var(--color-bg-secondary);
    flex-shrink: 0;
    padding-top: 26px;
    //border-top-right-radius: 20px;
    //border-bottom-right-radius: 20px;
  }

  .main-layout-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background: var(--color-bg-primary);

    .main-layout-header {
      width: 100%;
      height: 56px;
      flex-shrink: 0;
      -webkit-app-region: drag; // 支持窗口拖动
      background: var(--color-bg-primary);
      //border-bottom: 1px solid #e3e7eb;
    }

    .main-layout-content-center {
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      margin-right: 20px;
      margin-bottom: 20px;
      //border-radius: 20px;
      background: var(--color-bg-primary);
      padding:0 20px 20px 20px;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none; /* 针对 Chrome、Safari 和 Opera */
      }
    }

  }
}
</style>
