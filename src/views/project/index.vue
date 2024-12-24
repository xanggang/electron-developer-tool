<template>
  <div class="app-page-content">
    <a-form
      layout="inline"
      :model="formState"
    >
      <a-form-item>
        <Adcd
          v-model:value="formState.adcd"
          class="w-2xl!"
          placeholder="行政区划"
          allow-clear
        ></Adcd>
      </a-form-item>
      <a-form-item>
        <a-select
          v-model:value="formState.language"
          :options="LANGUAGE_OPTIONS"
          allow-clear
          class="w-2xl!"
          placeholder="语言"
        ></a-select>
      </a-form-item>
      <a-form-item>
        <a-input
          class="w-2xl!"
          v-model:value="formState.projectName"
          placeholder="项目名称"
          allow-clear
          @press-enter="getPageData"
        ></a-input>
      </a-form-item>
      <!--      <a-form-item>-->
      <!--        <a-input-->
      <!--          class="w-2xl!"-->
      <!--          v-model:value="formState.state"-->
      <!--          placeholder="项目状态"-->
      <!--        ></a-input>-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button type="primary" @click="handelSearch">搜索</a-button>
        <a-button type="primary" class="ml-20" @click="openProjectSetting">添加项目</a-button>
        <a-button type="primary" class="ml-20">分类管理</a-button>
        <a-button type="primary" class="ml-20" @click="openAppSetting">应用管理</a-button>
      </a-form-item>
    </a-form>

    <div class="card-wrap">
      <Card
        v-for="project in dataList"
        class="w-280!"
        :key="project.id"
        :project="project"
        @edit="handleEdit(project)"
      ></Card>
    </div>
    <div class="w-full flex justify-end mt-10">
      <a-pagination
        v-model:current="pagination.current"
        :total="pagination.total"
        show-less-items
        :page-size="pagination.pageSize"
        @change="getPageData"
      ></a-pagination>
    </div>

    <AppSetting v-model:visible="visibleAppSetting"></AppSetting>
    <ProjectSetting
      v-if="visibleProjectSetting"
      v-model:visible="visibleProjectSetting"
      @refresh="handelSearch"
      :project="editProject"
    ></ProjectSetting>
  </div>
</template>
<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import { getProjectPageList } from '@/ipc/project'
import { IProjectVo } from '#vo/ProjectVo'
import Adcd from '@/components/Adcd/index.vue'
import AppSetting from './AppSetting.vue'
import ProjectSetting from './ProjectSetting.vue'
import Card from './Card.vue'
import { LANGUAGE_ENUMS, LANGUAGE_OPTIONS } from '../../../enums/language'

interface FormState {
  adcd: string;
  projectName: string;
  language?: LANGUAGE_ENUMS;
}

const formState: UnwrapRef<FormState> = reactive({
  adcd: '',
  projectName: '',
  language: undefined,
})

const dataList = ref<IProjectVo[]>([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 20,
})

function handelSearch() {
  pagination.current = 1
  getPageData()
}

async function getPageData() {
  const res = await getProjectPageList({
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    ...formState,
  })
  pagination.total = res.total
  dataList.value = res.rows
}

onMounted(getPageData)

const visibleAppSetting = ref(false)

function openAppSetting() {
  visibleAppSetting.value = true
}

const visibleProjectSetting = ref(false)
const editProject = ref<IProjectVo |null>(null)

function openProjectSetting() {
  visibleProjectSetting.value = true
}

function handleEdit(project: IProjectVo) {
  editProject.value = project
  visibleProjectSetting.value = true
}
</script>

<style lang="less" scoped>
.app-page-content {

}

.card-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
</style>
