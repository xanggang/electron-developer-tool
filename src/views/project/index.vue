<template>
  <div class="app-page-content">
    <div class="search p-10">
      <a-form
        layout="inline"
        :model="formState"
      >
        <a-row :gutter="[0, 10]">
          <a-col :span="6">
            <a-form-item>
              <Adcd
                v-model:value="formState.adcd"
                class="w-full"
                placeholder="行政区划"
                allow-clear
              ></Adcd>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-select
                v-model:value="formState.language"
                :options="LANGUAGE_OPTIONS"
                allow-clear
                class="w-full"
                placeholder="语言"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input
                class="w-full"
                v-model:value="formState.projectName"
                placeholder="项目名称"
                allow-clear
                @press-enter="getPageData"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" @click="handelSearch">搜索</a-button>
          </a-col>
          <a-col :span="24">
            <a-button type="primary" @click="openProjectSetting">添加项目</a-button>
            <a-button type="primary" class="ml-20">分类管理</a-button>
            <a-button type="primary" class="ml-20" @click="openAppSetting">应用管理</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="main">
      <div class="card-wrap">
        <a-row :gutter="[10, 10]" class="w-full">
          <a-col
            v-for="project in dataList"
            :key="project.id"
            :xs="12"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <Card
              class="w-full"
              :key="project.id"
              :project="project"
              @refresh="handelSearch"
              @show-md="handleShowMd(project)"
              @edit="handleEdit(project)"
            ></Card>
          </a-col>
        </a-row>
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
    </div>

    <AppSetting v-model:visible="visibleAppSetting"></AppSetting>
    <ProjectSetting
      v-if="visibleProjectSetting"
      v-model:visible="visibleProjectSetting"
      @refresh="handelSearch"
      :project="editProject"
    ></ProjectSetting>

    <MdView v-if="visibleMd" v-model:visible="visibleMd" :project="editProject"></MdView>
  </div>
</template>
<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import { getProjectPageList } from '@/ipc/project'
import { IProjectVo } from '#vo/ProjectVo'
import Adcd from '@/components/Adcd/index.vue'
import AppSetting from './AppSetting.vue'
import ProjectSetting from './ProjectSetting.vue'
import MdView from './MdView.vue'
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

const visibleMd = ref(false)
async function handleShowMd(project: IProjectVo) {
  editProject.value = project
  visibleMd.value = true
}
</script>

<style lang="less" scoped>
.app-page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .search {
    flex-shrink: 1;
  }

  .main {
    height: 100%;
    overflow: auto;
    margin-top: 5px;
    padding-left: 10px;
    //flex-shrink: 0;
  }
}

.card-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
</style>
