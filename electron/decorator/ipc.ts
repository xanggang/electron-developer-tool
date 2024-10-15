import { ipcMain } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

type IcpMethod = (event?: IpcMainInvokeEvent, ...args: any[]) =>  Promise<any> | any | void

const map = new Map<string, IcpMethod>()

export function ipc(value: IcpMethod, context: ClassMethodDecoratorContext) {
  const { kind, name} = context
  map.set(name as string, value)
  return value
}

export function registerAllIpcMethods() {
  map.keys().forEach((name) => {
    console.log('正在注册ipc方法' + name)
    ipcMain.handle(name, map.get(name))
  })
}
