<template>
  <div class="main-layout-content-menu">
    <div class="logo">
      Aibaba
    </div>
    <div class="menu-list-wrap">
      <div class="active-bg" :style="bgStyle">
        <SvgIcon name="chamfer" class="top-arrow"></SvgIcon>
        <SvgIcon name="chamfer" class="bottom-arrow"></SvgIcon>
      </div>
      <div
        v-for="item in menuList"
        :key="item.path"
        @click="handleChange(item.path)"
        :class="['menu-item', { 'active': active === item.path }]"
      >
        <SvgIcon
          name="picture-in-picture-line"
          class="item-icon"
        />
        {{ item.menuName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@render/components/SvgIcon.vue'

const { push } = useRouter()

const menuList = [
  { menuName: '首页', path: '/home' },
  { menuName: '项目列表', path: '/project' },
  { menuName: '快速启动', path: '/starter' },
  { menuName: '任务管理', path: '/task' },
]

const active = ref(menuList[0].path)

const bgStyle = computed(() => {
  const index = menuList.findIndex((item) => item.path === active.value)
  return {
    top: `${index * 42}px`,
  }
})

function handleChange(path: string) {
  active.value = path
  push(path)
}

</script>

<style scoped lang="less">

.main-layout-content-menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0 20px 10px;

  .logo {
    //width: 30px;
    //height: 20px;
    -webkit-app-region: drag; // 支持窗口拖动
    font-family: DingTalk_JinBuTi_Regular;
    font-size: 26px;
    color: #24af47;
    user-select: none;
  }

  .menu-list-wrap {
    margin-top: 40px;
    width: 100%;
    height: 100%;
    position: relative;

    .menu-item {
      width: 100%;
      height: 42px;
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--color-text-secondary);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      cursor: pointer;
      font-family: PingFang-Regular;
      padding-left: 12px;
      position: relative;
      transition: all 0.2s;

      .item-icon {
        width: 16px;
        height: 22px;
        margin-right: 10px;
        color: var(--color-text-main);
      }

      &.active {
        color: var(--color-success);
        font-family: PingFang-Medium;
        //font-weight: bolder;

        .item-icon {
          color: var(--color-success);
        }
      }

    }

    .active-bg {
      width: 100%;
      height: 42px;
      background: var(--color-bg-primary);
      position: absolute;
      top: 0;
      left: 0;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      transition: all 0.2s;

      .top-arrow {
        position: absolute;
        width: 16px;
        height: 16px;
        top: -16px;
        right: 0;
        color: var(--color-bg-primary);
      }

      .bottom-arrow {
        position: absolute;
        width: 16px;
        height: 16px;
        bottom: -16px;
        right: 0;
        transform: rotate(270deg);
        color: var(--color-bg-primary);
      }
    }
  }
}
</style>
