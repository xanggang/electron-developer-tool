import { registerAllIpcMethods } from '../decorator/ipc'
import '../controller'
import { startApp } from './window'
import { setUpMenu, setUpShortcutKey } from './menu'
import { setupMainAppConfig } from '../conf'
import log, { initLogger } from '../common/logger'
import { registerFileProtocol, setupFileProtocol } from '../utils/registerFileProtocol'
import Migrate from '../database/Migrate'
import { initDb } from '../database/DBConnect'
import initUpdater from './updater'

async function start() {
  await initLogger()
  log.info('app启动')

  registerFileProtocol()
  
  initUpdater()

  /**
   * 注册ipc方法
   */
  registerAllIpcMethods()

  // 读取系统配置
  await setupMainAppConfig()

  // 配置菜单
  setUpMenu()

  // 配置快捷键
  setUpShortcutKey()

  await startApp()

  // 需要再app.whenReady()之后
  setupFileProtocol()

  // 初始化db
  await initDb()

  // 创建表
  await Migrate.migrateRun()
}

start()
