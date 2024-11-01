<template>
  <div class="project-card w-full border">
    <div class="flex justify-between items-center">
      <div class="border p-6 border-rd-[50%] flex-center">
        <img class="w-40 h-40" src="@/assets/vite.svg" alt="">
      </div>

      <div class="flex justify-end items-end">
        <div class=" flex-center text-white bg-gray border-rd-[50%] font-size-15 w-30 h-30 cursor-pointer">
          <folder-open-outlined />
<!--          打开项目-->
        </div>

        <div class="ml-12  flex-center text-white bg-gray border-rd-[50%] font-size-15 w-30 h-30">
          <folder-open-outlined />
<!--          打开文件夹-->
        </div>

        <div class="ml-12 flex-center text-white bg-gray border-rd-[50%] font-size-15 w-30 h-30">
          <folder-open-outlined />
<!--          访问地址-->
        </div>
      </div>
    </div>
    <div class="font-bold text-gray-7 text-18 mt-20">
      浙水节约
    </div>
    <div class="mt-12 flex justify-between items-center">
      <span class="text-gray-5">项目类型</span>
      <span class="text-gray-7 ml-20">java</span>
    </div>
    <div class="mt-12 flex justify-between items-center">
      <span class="text-gray-5">行政区划</span>
      <span class="text-gray-7 ml-20">省级</span>
    </div>
    <a-button block class="mt-20">启动项目</a-button>
  </div>
</template>

<script lang="ts" setup>
import { FolderOpenOutlined }  from '@ant-design/icons-vue'
</script>

<style scoped lang="less">

.project-card {
  border-radius: 8px;

  padding: 20px;
  background: #fff;
}

.border {
  border: 1px solid #e3e3e3;
}
</style>
