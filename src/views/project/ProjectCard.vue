<template>
  <div class="project-card w-full border">
    <div class="font-bold text-gray-7 text-18 ">
      {{ project.projectName }}
    </div>
    <div class="flex justify-between items-center mt-20">
      <div class="flex justify-end items-end">
        <div class=" flex-center text-white border-rd-[50%] font-size-15 w-30 h-30 cursor-pointer">
          <a-tooltip>
            <template #title>打开项目地址</template>
            <SvgIcon name="open-folder" @click="handleOpenFolder"></SvgIcon>
            <!--            <folder-open-outlined @click="handleOpenFolder"></folder-open-outlined>-->
          </a-tooltip>
          <!--          打开项目-->
        </div>

        <div class="ml-12  flex-center text-white font-size-15 w-30 h-30">
          <img
            class="w-full h-full cursor-pointer"
            :src="project.starter?.icon"
            @click="handleOpenProjectByStarter"
          />
          <!--          <folder-open-outlined @click="handleOpenProjectByStarter"></folder-open-outlined>-->
          <!--          打开文件夹-->
        </div>

        <div class="ml-12 flex-center text-white border-rd-[50%] font-size-15 w-30 h-30">
          <a-tooltip>
            <template #title>打开项目文档</template>
            <SvgIcon
              class="cursor-pointer"
              name="nootbook"
              @click="handleOpenFolder"
            ></SvgIcon>
            <!--            <folder-open-outlined @click="handleOpenFolder"></folder-open-outlined>-->
          </a-tooltip>
        </div>
      </div>
    </div>
    <!--    <div class="mt-12 flex justify-between items-center">-->
    <!--      <span class="text-gray-5">项目类型</span>-->
    <!--      <span class="text-gray-7 ml-20">java</span>-->
    <!--    </div>-->
    <!--    <div class="mt-12 flex justify-between items-center">-->
    <!--      <span class="text-gray-5">行政区划</span>-->
    <!--      <span class="text-gray-7 ml-20"> {{ project.adName }}</span>-->
    <!--    </div>-->
    <a-button block class="mt-20" @click="handleOpenProjectByStarter">
      <template #icon>
        <img
          class="w-24 h-24 cursor-pointer mr-10"
          :src="project.starter?.icon"
          @click="handleOpenProjectByStarter"
        />
      </template>
      启动项目
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { openFolder } from '@/ipc/fileSys'
import type { IProjectVo } from '#vo/ProjectVo'
import { openProjectByStarter } from '@/ipc/project'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps<{
  project: IProjectVo
}>()

function handleOpenFolder() {
  openFolder(props.project.folderPath)
}

async function handleOpenProjectByStarter() {
  await openProjectByStarter(props.project.id!)
}
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
