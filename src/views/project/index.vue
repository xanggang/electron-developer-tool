<template>
  <div class="app-page-content">
    <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
    >
      <a-form-item>
        <a-select
            v-model:value="formState.adcd"
            :options="adcdOptions"
            class="w-2xl!"
            placeholder="行政区划"></a-select>
      </a-form-item>
      <a-form-item>
        <a-select
            v-model:value="formState.language"
            :options="languageOptions"
            class="w-2xl!"
            placeholder="语言"></a-select>
      </a-form-item>
      <a-form-item>
        <a-input
            class="w-2xl!"
            v-model:value="formState.projectName"
            placeholder="项目名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input
            class="w-2xl!"
            v-model:value="formState.state"
            placeholder="项目状态"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="getPageData">搜索</a-button>
        <a-button type="primary" class="ml-20" @click="openProjectSetting">添加项目</a-button>
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
      ></ProjectCard>
    </div>
    <a-pagination
        v-model:current="pagination.current"
        :total="pagination.total"
        show-less-items
        @change="handleChangePagination"
    />



    <AppSetting v-model:visible="visibleAppSetting"></AppSetting>
    <ProjectSetting
        v-if="visibleProjectSetting"
        v-model:visible="visibleProjectSetting"
        @refresh="getPageData"
    ></ProjectSetting>
  </div>
</template>
<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import type { FormProps } from 'ant-design-vue'
import ProjectCard from './ProjectCard.vue'
import AppSetting from './AppSetting.vue'
import ProjectSetting from './ProjectSetting.vue'
import ProjectDb, { type IProject } from '@/db/project'

function useSearch() {
  const adcdOptions = [
    {
      label: '湖北省',
      value: '33'
    }
  ]
  const languageOptions = [
    {
      label: 'javascript',
      value: 'javascript'
    },
    {
      label: 'java',
      value: 'java'
    },
  ]

  interface FormState {
    adcd: string;
    projectName: string;
    language: string;
    state: string
  }

  const formState: UnwrapRef<FormState> = reactive({
    adcd: '33',
    projectName:'',
    language: '',
    state: ''
  })


  const handleFinish: FormProps['onFinish'] = values => {
    console.log(values, formState)
  }

  return {
    adcdOptions,
    languageOptions,
    formState,
    handleFinish,
  }
}

const {
  adcdOptions,
  languageOptions,
  formState,
  handleFinish,
} = useSearch()

const dataList = ref<IProject[]>([])

const pagination = reactive({
  current: 0,
  total: 20,
})

function handleChangePagination(e) {
  getPageData()
}


async function getPageData() {
  const res = await ProjectDb.getPageList({
    pageNo: pagination.current,
    pageSize: 1,
    projectName: '11',
    adcd: '3301'
  })
  console.log(res);
  // pagination.total = res.total
  // console.log(res)
  // dataList.value = res
}

onMounted(getPageData)


const visibleAppSetting = defineModel('visibleAppSetting')

function openAppSetting() {
  visibleAppSetting.value = true
}

const visibleProjectSetting= defineModel('visibleProjectSetting', { default: false })

function openProjectSetting() {
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
