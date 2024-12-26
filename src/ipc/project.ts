import { ICreateProjectVo, IProjectSearchVo, IProjectVo } from '#vo/ProjectVo'
import request from '@/utils/IPCUtil'

// 打开弹窗， 获取一个文件的位置
export function getFilePath() {
  return request('getFilePath')
  // const res = await window.ipcRenderer.invoke('getFilePath')
  // return res
}

// 打开弹窗， 获取一个文件的位置
export function getFolderPath() {
  return request<string>('getFolderPath')
  // const res = await window.ipcRenderer.invoke('getFolderPath')
  // return res
}

export function getProjectList(data: IProjectSearchVo) {
  return request('getAllProjectList', data)
  // const res = await window.ipcRenderer.invoke('getAllProjectList', data)
  // return res
}

export function getProjectPageList(data: IProjectSearchVo) {
  return request<PageDataWrap<IProjectVo>>('getProjectPageList', data)
  // const res = await window.ipcRenderer.invoke('getProjectPageList', data)
  // return res
}

export function createProject(project: Partial<ICreateProjectVo>) {
  return request('createProject', project)
  // const res = await window.ipcRenderer.invoke('createProject', project)
  // return res
}

export function editProject(project: Partial<ICreateProjectVo>) {
  return request('editProject', project)
  // const res = await window.ipcRenderer.invoke('createProject', project)
  // return res
}

export function deleteProject(id: number) {
  return request('deleteProject', id)
  // const res = await window.ipcRenderer.invoke('createProject', project)
  // return res
}

export function openProjectByStarter(id: number) {
  return request('openProjectByStarter', id)
  // const res = await window.ipcRenderer.invoke('openProjectByStarter', id)
  // return res
}

// 读取项目下的md文件
export function getLocalFile(data: {
  folderPath: string
  fileName: string
}) {
  return request<string>('getLocalFile', data)
  // const res = await window.ipcRenderer.invoke('openProjectByStarter', id)
  // return res
}

export function writeFileByPath(filePath: string[], fileContent: string) {
  return request('writeFileByPath', filePath, fileContent)
  // const res = await window.ipcRenderer.invoke('openProjectByStarter', id)
  // return res
}
