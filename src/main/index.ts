import { app, BrowserWindow, shell } from 'electron'
import { startApp } from './windows/mainWindow'
import { showLoading, hideLoading } from './windows/loading'
import { installController } from './controller'
import { initDataBase } from './database'
// import { initLogger } from './conf/logger';

function stop(num: number = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 3000)
  })
}

async function start() {
  await app.whenReady()
  showLoading()
  await stop()
  await installController()
  await initDataBase()
  hideLoading()
  startApp()
}

start()
