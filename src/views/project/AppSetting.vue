<template>
  <a-modal
      width="700px"
      v-model:visible="visible"
      title="系统应用管理"
      @ok="handleOk">
    <div class="flex justify-start items-center flex-wrap  gap-[10px] mt-20 ">
      <div class="card border p-6 border-rd-4 flex-center cursor-pointer relative"
           v-for="i in 10"
      >
        <div class="delete-wrap">
          <delete-outlined class="delete-item"/>
        </div>
        <img class="w-60 h-60" src="@/assets/vite.svg" alt="">
      </div>

      <div
          @click="selectAppPath"
          class="border p-6 w-72 h-72 border-rd-4 flex-center cursor-pointer text-30 text-gray-4">
        <plus-circle-outlined />
      </div>
    </div>

  </a-modal>
</template>

<script lang="ts" setup>
import { PlusCircleFilled } from '@ant-design/icons-vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import StarterDb from '@/db/starter'
import { getFilePath } from '@/ipc/project'

const visible = defineModel('visible', { type: Boolean })

const appList = ref([])

function handleOk() {
  visible.value = false
}

async function selectAppPath() {
  const res = await getFilePath()
  console.log(res)
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
