<template>
  <div class="w-full h-[1920px] bg-red-5">
    index

  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@render/components/SvgIcon.vue'
</script>

<style scoped lang="less">
.square {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.square::before,
.square::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: white;
}

.square::before {
  top: 0;
  left: 0;
  clip-path: polygon(0 0, 50% 0, 100% 50%, 50% 100%);
}

.square::after {
  top: 50%;
  left: 50%;
  clip-path: polygon(100% 0, 100% 50%, 50% 100%, 0 50%);
  transform: translate(-50%, -50%);
}
</style>
