import path from 'node:path'
import { app, BrowserWindow, shell } from 'electron'
import { PRELOAD_URL, INDEX_HTML, VITE_DEV_SERVER_URL, VITE_PUBLIC } from './appConfig'
import os from 'node:os'

let win: BrowserWindow | null = null
/**
 * 创建浏览器窗口
 */
export function createWindow() {
  const win = new BrowserWindow({
    // frame: false,
    // transparent: true,
    title: 'Main window',

    icon: path.join(VITE_PUBLIC, 'favicon.ico'),
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
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344

  return win
}

/**
 * 启动app
 */
export function startApp() {
  //关闭Windows 7的GPU加速
  if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置Windows 10+通知的应用程序名称
  if (process.platform === 'win32') app.setAppUserModelId(app.getName())

  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }

  app.whenReady().then(() => {
    win = createWindow()
  })

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
