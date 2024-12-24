import { IStarter } from '#vo/Starter'
import request from '@/utils/IPCUtil'

export function getAllStarter() {
  return request<IStarter[]>('getAllStarter')
  // const res = await window.ipcRenderer.invoke('getAllStarter') as IStarter[]
  // return res
}

export function createStarter(data: IStarter) {
  return request('createStarter', data)
  // const res = await window.ipcRenderer.invoke('createStarter', data)
  // return res
}

export function deleteStarter(id: number) {
  return request('deleteStarter', id)
  // const res = await window.ipcRenderer.invoke('deleteStarter', id)
  // return res
}

export function getExeIconByPath(path: string) {
  return request('getExeIconByPath', path)
  // const res = await window.ipcRenderer.invoke('getExeIconByPath', path)
  // return res
}
