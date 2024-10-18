import { ipcMain } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

type IcpMethod = (event?: IpcMainInvokeEvent, ...args: any[]) =>  Promise<any> | any | void

// ipcMain.handle
const handleMap = new Map<string, IcpMethod>()

// ipcMain.on
const onMap = new Map<string, IcpMethod>()

export function handle(icpMethod: Function, context: ClassMethodDecoratorContext) {
  const { name} = context
  const newFun = (_event?: IpcMainInvokeEvent, ...args: any[]) => {
    return icpMethod(...args)
  }
  handleMap.set(name as string, newFun)
}

export function on(icpMethod: Function, context: ClassMethodDecoratorContext) {
  const { name} = context
  const newFun = (_event?: IpcMainInvokeEvent, ...args: any[]) => {
    icpMethod(...args)
  }
  onMap.set(name as string, newFun)
}

export function registerAllIpcMethods() {
  handleMap.forEach((fun, name) => {
    console.log('正在注册ipc:handle方法' + name)
    ipcMain.handle(name, fun)
  })

  onMap.forEach((fun, name) => {
    console.log('正在注册ipc:on方法' + name)
    ipcMain.on(name, fun)
  })
}
