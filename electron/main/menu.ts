import { Menu, globalShortcut  } from 'electron'
import { showWindow } from './window'

/**
 * 配置菜单
 */
export function setUpMenu() {
  Menu.setApplicationMenu(null)
}

/**
 * 配置快捷键
 */
export function setUpShortcutKey() {
  globalShortcut.register('Alt+M', () => {
    console.log('唤起窗口')
    showWindow()
  })
}
