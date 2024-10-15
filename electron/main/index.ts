import { registerAllIpcMethods } from '../decorator/ipc'
import '../controller'
import { startApp } from './window'
import { setMenu } from './menu'

setMenu()

startApp()

/**
 * 注册ipc方法
 */
registerAllIpcMethods()




