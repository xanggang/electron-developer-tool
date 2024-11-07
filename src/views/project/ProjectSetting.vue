<template>
  <a-modal
      width="700px"
      v-model:visible="visible"
      title="系统应用管理"
      cancel-text="取消"
      ok-text="确认"
      @ok="handleOk">

    <a-form
        layout="horizontal"
        :model="formState"
        :rules="rules"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 18 }"
        ref="formRef"
    >
      <a-form-item label="项目中文名称" name="projectName">
        <a-input v-model:value="formState.projectName" placeholder="项目名称"></a-input>
      </a-form-item>

      <a-form-item label="仓库地址" name="gitUrl">
        <a-input @input="handleChangeGitUrl" v-model:value="formState.gitUrl" ></a-input>
      </a-form-item>

      <a-form-item label="项目目录" name="folderPath">
        <a-input v-model:value="formState.folderPath" placeholder="请选择项目地址">
        </a-input>
      </a-form-item>

      <a-form-item label="项目所属区域" name="adcd">
        <Adcd @change="handleChangeAdcd" v-model:value="formState.adcd"></Adcd>
      </a-form-item>

      <a-form-item label="启动工具" name="exeId">
        <AppCardSelect v-model:active="formState.exeId"></AppCardSelect>
      </a-form-item>



      <a-form-item label="测试环境地址" name="projectDevUrl">
        <a-input v-model:value="formState.projectDevUrl" ></a-input>
      </a-form-item>

      <a-form-item label="生产环境地址" name="projectProdUrl">
        <a-input v-model:value="formState.projectProdUrl" ></a-input>
      </a-form-item>

      <a-form-item label="备注信息" name="remark">
        <a-textarea v-model:value="formState.remark" ></a-textarea>
      </a-form-item>


    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { UnwrapRef } from 'vue'
import AppCardSelect from '@/components/AppCardSelect.vue'
import Adcd from '@/components/Adcd/index.vue'
import ProjectDb,  { type IProject } from '@/db/project'

const visible = defineModel('visible', { type: Boolean })


const formRef = ref()
const rules = {
  projectName: [{ required: true, message: '请填写项目名称' }],
  adcd: [{ required: true, message: '请选择项目所在区域' }],
  folderPath: [{ required: true, message: '请填写项目目录，' }],
  exeId: [{ required: true, message: '请选择项目启动方式' }],
  gitUrl: [{ required: true, message: '请填写项目git地址' }],
}

const formState: UnwrapRef<IProject> = reactive({
  projectName: '',
  adcd: '',
  adName: '',
  folderPath: '',
  remark: '',
  exeId: '',
  gitUrl: '',
  projectDevUrl: '',
  projectProdUrl: '',
  language: '',
})

function handleChangeGitUrl(event: any) {
  const url = event?.target?.value
  let { pathname } = new URL(url)
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }
  const name = pathname.split('/').at(-1)
  if (!name) {
    throw new Error('git仓库地址错误')
  }
  formState.folderPath = name
}

// 修改行政区划
function handleChangeAdcd(_adcd: string, adcdItem: any) {
  formState.adName = adcdItem.name
}

async function handleOk() {
  await formRef.value.validate()
  await ProjectDb.baseSet(toRaw(formState))
  visible.value = false
}
</script>

<style scoped lang="less">
.border {
  border: 1px solid #e3e3e3;
}

.card {
  overflow: hidden;

  &:hover {
    .delete-wrap {
      opacity: 1;
      right: -30px;
      top: -30px;
    }
  }
}

.delete-wrap {
  transition: all 0.2s;
  opacity: 0;
  position: absolute;
  right: -60px;
  top: -60px;
  background: #f3eded;
  font-size: 16px;
  color: red;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  .delete-item {
    margin-left: -20px;
    margin-top: 20px;
  }
}
</style>
