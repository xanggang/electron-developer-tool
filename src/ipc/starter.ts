import { IStarter } from '#vo/Starter'

export async function getAllStarter() {
  const res = await window.ipcRenderer.invoke('getAllStarter') as IStarter[]
  return res
}

export async function createStarter(data: IStarter) {
  const res = await window.ipcRenderer.invoke('createStarter', data)
  return res
}

export async function deleteStarter(id: number) {
  const res = await window.ipcRenderer.invoke('deleteStarter', id)
  return res
}

export async function getExeIconByPath(path: string) {
  const res = await window.ipcRenderer.invoke('getExeIconByPath', path)
  return res
}
