import { useDark } from '@vueuse/core'

// colors.ts - 统一管理颜色变量，支持 Light & Dark 主题

/** 主题主色 */
export const primary = '#24af47' // 主要品牌色
export const primaryLight = '#4cd964' // 亮色交互（Hover）
export const primaryDark = '#1b8c38' // 深色交互（Active）

/** 背景颜色（Light 模式） */
export const lightBackground = {
  primary: '#ffffff', // 主背景色
  secondary: '#f5f5f5', // 次要背景色（卡片）
  tertiary: '#e0e0e0', // 辅助背景色（分割线）
}

/** 背景颜色（Dark 模式） */
export const darkBackground = {
  primary: '#121212', // 深色模式主背景
  secondary: '#1e1e1e', // 深色模式次级背景
  tertiary: '#252525', // 深色模式辅助背景
}

/** 文字颜色（Light 模式） */
export const lightText = {
  primary: '#212121', // 主要文字
  secondary: '#616161', // 次要文字
  tertiary: '#9e9e9e', // 辅助文字
  muted: '#bdbdbd', // 失效文字
  inverted: '#ffffff', // 反色文字（暗背景上）
}

/** 文字颜色（Dark 模式） */
export const darkText = {
  primary: '#ffffff', // 主要文字
  secondary: '#bdbdbd', // 次要文字
  tertiary: '#9e9e9e', // 辅助文字
  muted: '#757575', // 失效文字
  inverted: '#121212', // 反色文字（亮背景上）
}

/** 状态颜色 */
export const statusColors = {
  success: '#24af47', // 成功状态
  warning: '#ff9800', // 警告状态
  error: '#e53935', // 错误状态
}

/** 统一导出 */
export const theme = {
  primary,
  primaryLight,
  primaryDark,
  lightBackground,
  darkBackground,
  lightText,
  darkText,
  statusColors,
}

export default function useTheme() {
  const isDark = useDark()

  function changeDark() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    changeDark,
  }
}
