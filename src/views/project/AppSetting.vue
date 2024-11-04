<template>
  <a-modal
      width="700px"
      v-model:visible="visible"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleOk">

    <template #title>
      <span>系统应用管理</span>
      <a-button type="primary" class="ml-30" @click="handleOpenAddModal">添加</a-button>
    </template>

    <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'icon'">
          <img :src="record.icon" class="w100 h100" alt="">
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button danger type="link" @click="handleDelete(record)">删除</a-button>
        </template>
      </template>
    </a-table>


    <a-modal
        width="700px"
        v-model:visible="childrenVisible"
        ok-text="确认"
        cancel-text="取消"
        :cancelButtonProps="{show: false}"
        title="添加app"
        @ok="handleAddExe">
      <div class="flex justify-start items-center">
        <div class="text-gray-7 shrink-0 w-130">选择app启动地址</div>
        <a-input disabled class="ml-20" v-model:value="formState.exePath">
          <template #addonAfter>
            <FolderOutlined @click="handleSelectExe"/>
          </template>
        </a-input>
      </div>
      <div class="flex justify-start items-center mt-30">
        <div class="text-gray-7 shrink-0 w-130">选择app图标</div>
        <a-input disabled class="ml-20" v-model:value="formState.iconPath">
          <template #addonAfter>
            <FolderOutlined @click="handleSelectIcon" v-if="!formState.iconPath"/>
            <img :src="formState.iconPath"
                 v-if="formState.iconPath"
                 @click="handleSelectIcon"
                 style="width: 10px;height: 10px;">
          </template>
        </a-input>


        <!--        <getLocalImage></getLocalImage>-->
      </div>
    </a-modal>

  </a-modal>
</template>

<script lang="ts" setup>
// import {PlusCircleFilled} from '@ant-design/icons-vue'
import {FolderOutlined} from '@ant-design/icons-vue'
// import {DeleteOutlined} from '@ant-design/icons-vue'
// import StarterDb from '@/db/starter'
import {getFilePath} from '@/ipc/project'
import {message} from "ant-design-vue";
import StarterDb from "@/db/starter";

const visible = defineModel('visible', {type: Boolean})
const childrenVisible = defineModel('childrenVisible', {type: Boolean})

const dataSource = ref()

const columns = [
  {title: 'app', dataIndex: 'path'},
  {title: '图标', dataIndex: 'icon'},
  {title: '操作', dataIndex: 'action'},
]

function handleOk() {
  visible.value = false
}



async function getAppList() {
  const res = await StarterDb.getAll()
  dataSource.value = res
}

watchEffect(() => {
  if (visible.value) {
    getAppList()
  }
})

const formState = reactive({
  exePath: '',
  iconPath: ''
})

// 打开弹窗
function handleOpenAddModal() {
  formState.exePath = ''
  formState.iconPath = ''
  childrenVisible.value = true
}
// 添加新的app
async function handleSelectExe() {
  const res = await getFilePath()
  formState.exePath = res
}

async function handleSelectIcon() {
  const res = await getFilePath()
  console.log(res);
  formState.iconPath = 'app://' + res
}

async function handleAddExe() {
  console.log(formState);
  if (!formState.exePath) {
    message.error('请选择exe文件')
    return
  }

  if (!formState.iconPath) {
    message.error('请选择icon文件')
    return
  }


  await StarterDb.baseSet({
    path: formState.exePath,
    icon: formState.iconPath
  })
  childrenVisible.value = false
  await getAppList()
  message.success('添加成功')
}

async function handleDelete(reco: Recordable) {
  try {
    await StarterDb.delete(reco.id)
    message.success('删除成功')
    await getAppList()
  } catch (e) {
    message.error('删除失败')
  }
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
