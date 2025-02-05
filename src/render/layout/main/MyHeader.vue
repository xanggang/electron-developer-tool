<template>
  <div class="main-layout-header">
    <div class="right-part">
      <!--      <div class="header-button sparkles-icon">-->
      <!--        <SvgIcon name="sparkles"></SvgIcon>-->
      <!--      </div>-->

      <!--      <div class="header-button">-->
      <!--        <SvgIcon name="t-shirt-line"></SvgIcon>-->
      <!--      </div>-->

      <div class="header-button">
        <SvgIcon
          name="cog-8-tooth"
          :style="{color: isDark ? 'red': 'yellow'}"
          @click="changeDark"
        />
      </div>

      <div class="header-divider" />

      <!--      <div class="header-button" @click="handleOpenDb">-->
      <!--        <SvgIcon name="picture-in-picture-line"></SvgIcon>-->
      <!--      </div>-->

      <div class="header-button">
        <SvgIcon name="minus" />
      </div>

      <div class="header-button">
        <SvgIcon name="x-mark" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@render/components/SvgIcon.vue'
import { useTheme } from '@render/theme'

const { isDark, changeDark } = useTheme()
</script>

<style scoped lang="less">

.main-layout-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.right-part {
  height: 100%;
  width: 150px;
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
    color: var(--sysIconColor);

    &:hover {
      opacity: 1;
    }

    & svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
