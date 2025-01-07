<template>
  <a-card
    hoverable
    size="small"
    @click.stop="handleShowDetail"
  >
    <template #actions>
      <a-tooltip>
        <template #title>打开项目地址</template>
        <SvgIcon name="open-folder" @click.stop="handleOpenFolder" class="w-26 h-26"></SvgIcon>
      </a-tooltip>

      <a-tooltip>
        <template #title>打开项目</template>
        <img
          class="cursor-pointer w-22 h-22"
          :src="project.starter?.icon"
          @click.stop="handleOpenProjectByStarter"
        />
      </a-tooltip>

      <a-tooltip>
        <template #title>打开项目文档</template>
        <SvgIcon
          class="cursor-pointer w-26 h-26"
          name="nootbook"
          @click.stop="handleShowMd"
        ></SvgIcon>
      </a-tooltip>
    </template>

    <template #title>
      {{ project.projectName }}
      <StarFilled
        @click.stop="handleStart"
        v-if="project.favorite === 1"
        class="ml-10"
        :style="{color: project.favorite === 1 ? '#f50' : '#cccccc'}"
      ></StarFilled>
    </template>

    <template #extra>
      <a-dropdown>
        <a class="ant-dropdown-link">
          操作
        </a>
        <template #overlay>
          <a-menu @click="handleSelectMenu">
            <a-menu-item key="delete">
              <span class="text-red-5">删除项目</span>
            </a-menu-item>
            <a-menu-item key="edit">
              编辑
            </a-menu-item>
            <a-menu-item key="favorite">
              收藏
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>

    <div>
      <a-tag color="#f50" v-if="project.language">
        {{ getLanguageName(project.language) }}
      </a-tag>
      <a-tag color="#0f50ab" v-if="project.adName">
        {{ project.adName }}
      </a-tag>
      <a-tag color="#2db7f5" v-if=" project.type">
        {{ project.type }}
      </a-tag>
    </div>

    <!--    <div class="flex justify-between items-center">-->
    <!--      <span class="text-gray-5 font-bold">语言类型</span>-->
    <!--      <span class="text-gray-7 ml-20">{{ getLanguageName(project.language) }}</span>-->
    <!--    </div>-->
    <!--    <div class="mt-12 flex justify-between items-center">-->
    <!--      <span class="text-gray-5 font-bold">行政区划</span>-->
    <!--      <span class="text-gray-7 ml-20"> {{ project.adName }}</span>-->
    <!--    </div>-->
  </a-card>
</template>

<script lang="ts" setup>
import { openFolder } from '@/ipc/fileSys'
import type { IProjectVo } from '#vo/ProjectVo'
import { deleteProject, favoriteProject, openProjectByStarter } from '@/ipc/project'
import SvgIcon from '@/components/SvgIcon.vue'
import { Modal, message } from 'ant-design-vue'
import { StarFilled } from '@ant-design/icons-vue'
import { LANGUAGE_ENUMS } from '../../../enums/language'

const props = defineProps<{
  project: IProjectVo
}>()

const emits = defineEmits(['edit', 'showMd', 'refresh', 'show'])

function handleOpenFolder() {
  openFolder(props.project.folderPath)
}

async function handleOpenProjectByStarter() {
  await openProjectByStarter(props.project.id!)
}

async function handleSelectMenu(e: any) {
  if (e.key === 'delete') {
    Modal.confirm({
      title: '确认要删除该项目吗',
      content: h('div', { style: 'color:red;' }, '删除后不可恢复，请确认'),
      async onOk() {
        await deleteProject(props.project.id!)
        emits('refresh')
      },
      class: 'test',
    })
  }

  if (e.key === 'edit') {
    emits('edit')
  }

  if (e.key === 'favorite') {
    handleStart()
  }
}

async function handleStart() {
  const favorite = props.project.favorite === 1 ? 0 : 1
  await favoriteProject({
    id: props.project.id,
    favorite,
  })
  // eslint-disable-next-line vue/no-mutating-props
  props.project.favorite = favorite
  message.success(favorite === 1 ? '收藏成功' : '取消收藏成功')
}

function getLanguageName(e: LANGUAGE_ENUMS) {
  return LANGUAGE_ENUMS[e] || '-'
}

async function handleShowMd() {
  emits('showMd')
}
async function handleShowDetail() {
  emits('show')
}

</script>

<style scoped lang="less">

:deep(.ant-card-head) {
  //padding: 0 24px;
  height: 46px;
}

:deep(.ant-card-actions) {

  li {
    margin-top: 6px;
    margin-bottom: 6px;
  }
}
</style>
