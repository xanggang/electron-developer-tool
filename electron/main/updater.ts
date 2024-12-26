import { autoUpdater } from 'electron-updater'
import { app } from 'electron'
import path from 'node:path'
import logger from '../common/logger'
import { VITE_PUBLIC } from './appConfig'

function initUpdater() {
  autoUpdater.forceDevUpdateConfig = true

  // 手动将更新文件地址指向本地文件，
  autoUpdater.updateConfigPath = path.join(VITE_PUBLIC, 'dev-update.yml')

  // 启动自动检查更新
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('error', (error) => {
    logger.debug(`更新错误${error.message}`)
  })

  // 监听发现可用更新事件
  autoUpdater.on('update-available', (message) => {
    logger.debug(`检测到可用更新，当前版本${app.getVersion()} 更新地址${message}`)
  })
  // 监听没有可用更新事件
  // autoUpdater.on('update-not-available', (message) => {
  //   console.log('update - not-available', message)
  // })

  // 更新下载进度事件
  autoUpdater.on('download-progress', (_progressObj) => {
    // console.log('download-progress', progressObj)
    // 这里要处理更新进度条，  一般重新建一个窗口
  })
  // 监听下载完成事件
  autoUpdater.on('update-downloaded', () => {
    logger.debug('新安装包下载完成， 这里要关闭应用重新下载')
  })
}

export default initUpdater
