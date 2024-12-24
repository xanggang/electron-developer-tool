import { Menu, globalShortcut, MenuItem } from 'electron'
import { openDevTools, showWindow } from './window'
import logger from '../common/logger'

/**
 * 配置菜单
 */
export function setUpMenu() {
  const menu = new Menu()
  logger.debug('setUpMenu')
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      click: () => {
        openDevTools()
      },
    }],
  }))

  Menu.setApplicationMenu(menu)
}

/**
 * 配置快捷键
 */
export function setUpShortcutKey() {
  globalShortcut.register('Alt+M', () => {
    showWindow()
  })

  globalShortcut.register('F12', () => {
    openDevTools()
  })
}
