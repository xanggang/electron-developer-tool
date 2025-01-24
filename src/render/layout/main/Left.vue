<template>
  <div class="main-layout-content-menu">

    <div class="menu-item active">
      菜单一
    </div>
    <div class="menu-item">
      菜单一
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">

.main-layout-content-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .menu-item {
    width: 100%;
    height: 36px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #10451d;
    border-radius: 8px;
    margin-bottom: 12px;

    &.active {
      background: #e0f4e5;
      color: #25a244
    }
  }
}
</style>
