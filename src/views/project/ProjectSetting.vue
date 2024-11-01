<template>
  <a-modal
      width="700px"
      v-model:visible="visible"
      title="系统应用管理"
      @ok="handleOk">

    <a-form
        layout="horizontal"
        :model="formState"
        @finish="handleFinish"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 18 }"
    >
      <a-form-item label="项目名称" name="projectName">
        <a-input v-model:value="formState.projectName" placeholder="项目名称"></a-input>
      </a-form-item>

      <a-form-item label="项目目录" name="folderPath">
        <a-input disabled v-model:value="formState.folderPath" placeholder="请选择项目地址">
          <template #addonAfter>
            <FolderOpenOutlined class="cursor-pointer"></FolderOpenOutlined>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="启动工具" name="folderPath1">

      </a-form-item>
      <a-form-item label="仓库地址" name="gitUrl">
        <a-input v-model:value="formState.gitUrl" ></a-input>
      </a-form-item>
      <a-form-item label="原型或其他资料地址" name="gitUrl">
        <a-input v-model:value="formState.gitUrl" ></a-input>
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
import { UnwrapRef } from 'vue/dist/vue'
import { FolderOpenOutlined } from '@ant-design/icons-vue'

const visible = defineModel('visible', { type: Boolean })

interface FormState {
  adcd: string;
  projectName: string;
  language: string;
  state: string
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const formState: UnwrapRef<FormState> = reactive({
  adcd: '33',
  projectName:'',
  language: '',
  state: ''
})


function handleFinish() {

}
function handleOk() {

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
