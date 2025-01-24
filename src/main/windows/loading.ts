import { app, BrowserWindow, globalShortcut } from 'electron'
import path from 'node:path'
import { VITE_PUBLIC } from '../conf/appConfig'

let loadingWindow : BrowserWindow | null

export function showLoading() {
  loadingWindow = new BrowserWindow({
    show: false,
    frame: false, // 无边框（窗口、工具栏等），只包含网页内容
    width: 400,
    height: 400,
    resizable: false,
    transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
  })
  
  loadingWindow.loadFile(path.join(VITE_PUBLIC, 'init-loading.html'))
  loadingWindow.show()
}

export function hideLoading() {
  if (loadingWindow) {
    loadingWindow.hide()
  }
}
