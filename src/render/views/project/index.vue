<template>
  <div class="project-wrap w-full h-full">
    <a-row
      :gutter="[10, 10]"
      class="w-full"
    >
      <a-col
        v-for="project in 20"
        :key="project"
        :xs="12"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="4"
      >
        <div class="card">
          <div class="flex justify-start items-center">
            <div class="w-[75%]">
              <div class="font-bold text-16 text-main">
                dc-admin-ui
              </div>

              <div class="text-14 mt-6 text-secondary">
                UI组件库
              </div>
            </div>
            <div class="run">
              <span class="iconfont icon-taiyang"/>
            </div>
          </div>

          <div class="mt-12 flex justify-end">
            <span class="run iconfont icon-taiyang"/>
            <span class="run iconfont icon-taiyang ml-12"/>
            <span class="run iconfont icon-taiyang ml-12"/>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">

.project-wrap {

}

.card {
  font-family: PingFang-Regular;
  width: 100%;
  //height: 50px;
  padding: 20px;
  background: var(--color-bg-secondary);
  border-radius: 4px;

  .run {
    width: 24px;
    height: 24px;
    background: var(--color-primary);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>
