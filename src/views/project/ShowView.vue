<template>
  <a-modal
    width="800px"
    v-model:open="visible"
    ok-text="确认"
    cancel-text="取消"
    :footer="null"
  >
    <a-descriptions
      :title="project.projectName"
      bordered
      :column="2"
      :label-style="{width: '150px'}"
    >
      <a-descriptions-item label="项目名称" :span="2">
        {{ project.projectName }}
      </a-descriptions-item>
      <a-descriptions-item label="仓库地址" :span="2">
        <a :href="project.gitUrl">{{ project.gitUrl }}</a>
      </a-descriptions-item>
      <a-descriptions-item label="项目目录" :span="2">
        <a-button type="link" @click="handleOpenFolder">{{ project.folderPath }}</a-button>
      </a-descriptions-item>
      <a-descriptions-item label="项目所属区域">
        {{ project.adName }}
      </a-descriptions-item>
      <a-descriptions-item label="语言">
        {{ project.language }}
      </a-descriptions-item>
      <a-descriptions-item label="项目类型">
        {{ project.type }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script lang="ts" setup>
import { IProjectVo } from '#vo/ProjectVo'
import { openFolder } from '@/ipc/fileSys'

const visible = defineModel('visible', { type: Boolean })

const props = defineProps<{
  project: IProjectVo
}>()

async function handleOpenFolder() {
  openFolder(props.project.folderPath)
}
</script>

<style scoped lang="less">

</style>
