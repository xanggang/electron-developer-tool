import { registerAllIpcMethods } from '../decorator/ipc'
import '../controller'
import { startApp } from './window'
import { setUpMenu, setUpShortcutKey } from './menu'
import { setupMainAppConfig } from '../conf'
import log, { initLogger } from '../common/logger'


async function start () {

  await initLogger()
  log.info('app启动')
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

  startApp()
}

start()
