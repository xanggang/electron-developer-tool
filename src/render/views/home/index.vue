<template>
  <div class="w-full h-[1920px]">
    <a-row :gutter="[10, 10]">
      <a-col :span="8">
        <div
          id="ww_c13c2eacc94f1"
          class="weather-wrap"
          v="1.3"
          loc="id"
        >
          <a
            href="https://weatherwidget.org/"
            id="ww_63a560a5fd0a0_u"
            class="weather-text"
            target="_blank"
          >Widget weather</a>
        </div>
      </a-col>

      <a-col :span="8">
        <div class="tomato-bell">
          <div class="img"></div>
        </div>
      </a-col>

      <a-col :span="8">
        <div class="tomato-bell">
          任务列表
        </div>
      </a-col>

      <a-col :span="12">
        <div class="working-area">
          工作区 快速启动
        </div>
      </a-col>
      <a-col :span="12">
        <div class="working-area"></div>
      </a-col>
      <a-col :span="16">
        <div class="record-wrap">
          <div class="img"></div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="time-wrap">
          <AfterWork></AfterWork>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@render/components/SvgIcon.vue'
// import { initA } from './water'
import initWeather from './initWater'
import AfterWork from './AfterWork.vue'

onMounted(() => {
  initWeather()
})
</script>

<style scoped lang="less">

.weather-wrap {
  background: var(--color-bg-secondary)!important;
  color: var(--color-text-secondary)!important;
  border-radius: 4px;;
  width: 100%;
  height: 250px;

  .weather-text {
    opacity: 0;
  }
  //height: 140px;
}

.tomato-bell {
  width: 100%;
  background: var(--color-bg-secondary)!important;
  height: 250px;
  border-radius: 4px;;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    width: 80%;
    height: 80%;
    background-image: url("./img.png");
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }

}

.working-area {
  width: 100%;
  background: var(--color-bg-secondary)!important;
  height: 216px;
  border-radius: 4px;;
}

.record-wrap {
  width: 100%;
  background: var(--color-bg-secondary)!important;
  height: 216px;
  border-radius: 4px;;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    height: 100%;
    background-image: url("./img_1.png");
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
  }

}

.time-wrap {
  width: 100%;
  background: var(--color-bg-secondary)!important;
  height: 216px;
  border-radius: 4px;;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    height: 100%;
    background-image: url("./img_2.png");
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
  }

}
</style>
