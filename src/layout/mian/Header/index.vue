<template>
  <div class="header-container">
    <div class="left-part">
      <div class="logo">
        <SvgIcon name="logo"></SvgIcon>
      </div>
    </div>

    <div class="right-part">
<!--      <div class="header-button sparkles-icon">-->
<!--        <SvgIcon name="sparkles"></SvgIcon>-->
<!--      </div>-->

<!--      <div class="header-button">-->
<!--        <SvgIcon name="t-shirt-line"></SvgIcon>-->
<!--      </div>-->

      <div class="header-button">
        <SvgIcon name="cog-8-tooth"></SvgIcon>
      </div>

      <div class="header-divider"></div>

      <div class="header-button" @click="handleOpenDb">
        <SvgIcon name="picture-in-picture-line"></SvgIcon>
      </div>

      <div class="header-button" @click="handMinWindow">
        <SvgIcon name="minus"></SvgIcon>
      </div>

      <div class="header-button">
        <SvgIcon name="x-mark" @click="handleCloseApp"></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { ipcCloseApp, ipcMinWindow, ipcOpenDbFile } from '@/ipc/sys'

function handMinWindow() {
  ipcMinWindow()
}

function handleOpenDb() {
  ipcOpenDbFile()
}

function handleCloseApp() {
  ipcCloseApp()
}
</script>

<style scoped lang="less">
.header-container {
  width: 100vw;
  height: var(--appHeaderHeight, 54px);
  background-color: var(--primaryColor);
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  -webkit-app-region: drag;
  flex-shrink: 0;
  font-size: 1rem;
  position: relative;
  z-index: 20000;

  & .left-part {
    display: flex;
    align-items: center;

    & .logo {
      width: 142px;
      height: 1.2rem;
      color: var(--headerTextColor);
      display: flex;
      align-items: center;

      & svg {
        height: 1.1rem;
        width: auto;
      }
    }

  }

  & .right-part {
    height: 100%;
    color: var(--headerTextColor);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    -webkit-app-region: none;
    padding-right: 16px;
    gap: 4px;

    & .header-divider {
      height: 16px;
      width: 1px;
      opacity: 0.2;
      background-color: var(--headerTextColor);
    }

    & .sparkles-icon:hover {
      animation: vibrate 0.3s linear infinite both;
    }

    & .header-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 20px;
      opacity: 0.8;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      & svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}

@keyframes vibrate {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-1px, 1px);
  }
  40% {
    transform: translate(-1px, -1px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  80% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0);
  }
}

</style>
