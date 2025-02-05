<template>
  <div class="main-layout-content-center">
    <!-- 路由切换时的过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition
          name="fade-slide"
          mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">

.main-layout-content-center {
  overflow-x: hidden;
}
/* 过渡动画 CSS */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
  height: 100%;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
  height: 100%;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
  height: 100%;
}
</style>
