import { registerAllIpcMethods } from '../decorator/ipc'
import '../controller'
import { startApp } from './window'
import { setMenu } from './menu'
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

  setMenu()

  startApp()
}

start()
