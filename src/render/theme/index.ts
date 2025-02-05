import { useCssVar, useDark } from '@vueuse/core'
import defaultTheme from './default'
import dark from './dark'

export {
  defaultTheme,
  dark,
}

export function useTheme() {
  const mainDom = document.documentElement
  const isDark = useDark()

  const bg = useCssVar('--bg', mainDom)
  const contentBgColor = useCssVar('--contentBgColor', mainDom)
  const sysIconColor = useCssVar('--sysIconColor', mainDom)
  const menuTextColor = useCssVar('--menuTextColor', mainDom)
  const menuActiveColor = useCssVar('--menuActiveColor', mainDom)
  const menuActiveBg = useCssVar('--menuActiveBg', mainDom)

  function changeDark() {
    isDark.value = !isDark.value
    bg.value = unref(isDark) ? defaultTheme.bg : dark.bg
    contentBgColor.value = unref(isDark) ? defaultTheme.contentBgColor : dark.contentBgColor
    sysIconColor.value = unref(isDark) ? defaultTheme.sysIconColor : dark.sysIconColor
    menuTextColor.value = unref(isDark) ? defaultTheme.menuTextColor : dark.menuTextColor
    menuActiveColor.value = unref(isDark) ? defaultTheme.menuActiveColor : dark.menuActiveColor
    menuActiveBg.value = unref(isDark) ? defaultTheme.menuActiveBg : dark.menuActiveBg
  }

  return {
    isDark,
    changeDark,
  }
}
