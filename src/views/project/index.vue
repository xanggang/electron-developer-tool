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
            :allowClear="true"
            placeholder="行政区划"></Adcd>
      </a-form-item>
      <a-form-item>
        <a-select
            v-model:value="formState.language"
            :options="LanguageOptions"
            class="w-2xl!"
            :allowClear="true"
            placeholder="语言"></a-select>
      </a-form-item>
      <a-form-item>
        <a-select
            v-model:value="formState.type"
            :options="TypeOptions"
            :allowClear="true"
            class="w-2xl!"
            placeholder="语言"></a-select>
      </a-form-item>
      <a-form-item>
        <a-input
            class="w-2xl!"
            v-model:value="formState.projectName"
            :allowClear="true"
            placeholder="项目名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
        <a-button type="primary" class="ml-20" @click="openProjectSetting(false)">添加项目</a-button>
        <a-button type="primary" class="ml-20">分类管理</a-button>
        <a-button type="primary" class="ml-20" @click="openAppSetting">应用管理</a-button>
      </a-form-item>
    </a-form>

    <div class="card-wrap">
      <ProjectCard
          v-for="project in dataList"
          class="w-280!"
          :key="project.id"
          :project="project"
          @openDetail="openProjectSetting(project)"
      ></ProjectCard>
    </div>

    <a-pagination
        v-model:current="pagination.current"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        show-less-items
        @change="handleChangePagination"
        class="mt-10"
    />

    <AppSetting v-model:visible="visibleAppSetting"/>
    <ProjectSetting
        v-if="visibleProjectSetting"
        :editProject="editProject"
        v-model:visible="visibleProjectSetting"
        @refresh="getPageData"
    />
  </div>
</template>
<script lang="ts" setup>
import ProjectCard from './ProjectCard.vue'
import AppSetting from './AppSetting.vue'
import ProjectSetting from './ProjectSetting.vue'
import Adcd from '@/components/Adcd/index.vue'
import ProjectDb, {type IProject} from '@/db/project'
import {LanguageOptions, TypeOptions} from './project'

const formState = reactive({
  adcd: '33',
  projectName: '',
  language: '',
  type: ''
})

const dataList = ref<IProject[]>([])

const pagination = reactive({
  current: 1,
  total: 20,
  pageSize: 10,
})

function handleSearch() {
  pagination.current = 1
  getPageData()
}

function handleChangePagination() {
  getPageData()
}

async function getPageData() {
  const res = await ProjectDb.getPageList({
    pageNo: pagination.current - 1,
    pageSize: pagination.pageSize,
    projectName: formState.projectName,
    adcd: formState.adcd,
    type: formState.type,
    language: formState.language
  })
  console.log(res);
  dataList.value = res.list
  pagination.total = res.total
}

onMounted(getPageData)


const visibleAppSetting = defineModel('visibleAppSetting')

function openAppSetting() {
  visibleAppSetting.value = true
}

const editProject = ref<any>({})
const visibleProjectSetting = defineModel('visibleProjectSetting', {default: false})

function openProjectSetting(project: any) {
  console.log(project);
  editProject.value = project || {}
  visibleProjectSetting.value = true
}
</script>

<style lang="less" scoped>

.card-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
</style>
