<template>
  <a-modal
    width="800px"
    v-model:open="visible"
    ok-text="确认"
    cancel-text="取消"
    :footer="null"
    @ok="handleOk"
  >
    <template #title>
      <div class="flex w-full justify-between">
        <span>  {{ project.folderPath }}</span>
        <span class="mr-30">
          <a-button type="primary" v-if="!isEdit" @click="handleEdit">编辑</a-button>
          <a-button v-if="isEdit" class="ml-10" @click="handleCancel">取消</a-button>
          <a-button type="primary" v-if="isEdit" class="ml-10" @click="handleOk">保存</a-button>
        </span>
      </div>
    </template>
    <div class="model-content">
      <MdPreview
        v-if="!isEdit"
        :show-code-row-number="false"
        :no-mermaid="true"
        :toolbars="[]"
        v-model="showText"
      ></MdPreview>
      <MdEditor
        v-if="isEdit"
        :show-code-row-number="false"
        :no-mermaid="true"
        :toolbars="[]"
        :footers="[]"
        v-model="editText"
      ></MdEditor>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { getLocalFile, writeFileByPath } from '@/ipc/project'
import { IProjectVo } from '#vo/ProjectVo'
import { message } from 'ant-design-vue'

import { MdEditor, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const visible = defineModel('visible', { type: Boolean })

const props = defineProps<{
  project: IProjectVo
}>()

const isEdit = ref(false)
const showText = ref('')
const editText = ref('')

onMounted(async () => {
  const res = await getLocalFile({
    folderPath: props.project.folderPath,
    fileName: 'README.md',
  })

  showText.value = res

  // console.log(res)
})

async function handleOk() {
  const hide = message.loading('正在保存', 0)
  try {
    await writeFileByPath([props.project.folderPath, 'README.md'], editText.value)
    isEdit.value = false
    showText.value = editText.value
  } finally {
    hide()
  }
}

function handleEdit() {
  isEdit.value = true
  editText.value = showText.value
}

function handleCancel() {
  isEdit.value = false
  editText.value = ''
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

.model-content {
  max-height: 70vh;
  overflow-y: scroll;
}
</style>
