import path from 'node:path'
import { app, BrowserWindow, shell } from 'electron'
import os from 'node:os'
import {
  PRELOAD_URL, INDEX_HTML, VITE_DEV_SERVER_URL, VITE_PUBLIC,
} from './appConfig'
import logger from '../common/logger'

let win: BrowserWindow | null = null
/**
 * 创建浏览器窗口
 */
export function createWindow() {
  win = new BrowserWindow({
    height: 700,
    width: 1050,
    frame: false,
    title: 'Main window',

    icon: path.join(VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: PRELOAD_URL,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    console.log(' win.webContents.openDevTools()')
    win.webContents.openDevTools()
  } else {
    win.loadFile(INDEX_HTML)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url)
    return { action: 'deny' }
  })
  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http')) {
      logger.info(`跳转到外部地址${url}`)
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  return win
}

/**
 * 启动app
 */
export async function startApp() {
  // 关闭Windows 7的GPU加速
  if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

  // 设置Windows 10+通知的应用程序名称
  if (process.platform === 'win32') app.setAppUserModelId(app.getName())

  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }

  await app.whenReady()

  win = createWindow()

  app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('second-instance', () => {
    if (win) {
      // 如果用户试图打开另一个窗口，则关注主窗口
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      win = createWindow()
    }
  })
}

export function closeApp() {
  app.quit()
}

export function showWindow() {
  if (!win) {
    logger.error('window: 快捷键唤起窗口时， win不存在')
    return
  }
  if (!win.isFocused()) {
    win.show()
  }
}

export function getMainWindow() {
  return win
}

export function sendWebContentsSend() {
  const browserWindow = getMainWindow()
  if (!browserWindow) {
    throw new Error('sendWebContentsSend错误， 主窗口不存在')
  }
}

export function openDevTools() {
  if (!win) return
  win.webContents.openDevTools()
}
