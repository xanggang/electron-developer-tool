import { Menu, globalShortcut, MenuItem   } from 'electron'
import { openDevTools, showWindow } from './window'
import logger from '../common/logger'

/**
 * 配置菜单
 */
export function setUpMenu() {
  const menu = new Menu()
  console.log('setUpMenu')
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      click: () => {
        openDevTools()
      }
    }]
  }))

  Menu.setApplicationMenu(menu)
}

/**
 * 配置快捷键
 */
export function setUpShortcutKey() {
  globalShortcut.register('Alt+M', () => {
    console.log('唤起窗口')
    showWindow()
  })

  globalShortcut.register('F12', () => {
    console.log('打开开发工具')
    openDevTools()
  })
}
