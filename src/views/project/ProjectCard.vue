<template>
  <div class="project-card w-full border">
    <div class="flex justify-between items-center">
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

      <div
        class="ml-12 flex-center text-white bg-gray border-rd-[50%] font-size-15 w-30 h-30 cursor-pointer"
        @click="handleOpenDetail"
      >
        <AlignLeftOutlined />
        <!--          访问地址-->
      </div>
    </div>
    <div class="font-bold text-gray-7 text-18 mt-20 mb-20">
      {{ project.projectName }}
    </div>
    <a-tag color="#55acee" v-if="project.type"> {{ getTypeName(project.type) }}</a-tag>
    <a-tag color="#3b5999" v-if="project.language"> {{ getLanguageName(project.language) }}</a-tag>
    <a-tag color="#87d068" v-if="project.adName"> {{ project.adName }}</a-tag>
    <a-button block class="mt-20">启动项目</a-button>
  </div>
</template>

<script lang="ts" setup>
import { FolderOpenOutlined, AlignLeftOutlined }  from '@ant-design/icons-vue'
import type { IProject } from '@/db/project'
import {getLanguageName, getTypeName} from "@/views/project/project";

defineProps<{
  project: IProject
}>()

const emits = defineEmits(['openDetail'])

function handleOpenDetail() {
  emits('openDetail')
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
