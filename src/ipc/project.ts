import { ICreateProjectVo, IProjectSearchVo, IProjectVo } from '#vo/ProjectVo'
import request from '@/utils/IPCUtil'

// 打开弹窗， 获取一个文件的位置
export function getFilePath() {
  return request('getFilePath')
}

// 打开弹窗， 获取一个文件的位置
export function getFolderPath() {
  return request<string>('getFolderPath')
}

export function getProjectList(data: IProjectSearchVo) {
  return request('getAllProjectList', data)
}

export function getProjectPageList(data: IProjectSearchVo) {
  return request<PageDataWrap<IProjectVo>>('getProjectPageList', data)
}

export function createProject(project: Partial<ICreateProjectVo>) {
  return request('createProject', project)
}

export function editProject(project: Partial<ICreateProjectVo>) {
  return request('editProject', project)
}

export function deleteProject(id: number) {
  return request('deleteProject', id)
}

export function openProjectByStarter(id: number) {
  return request('openProjectByStarter', id)
}

// 读取项目下的md文件
export function getLocalFile(data: {
  folderPath: string
  fileName: string
}) {
  return request<string>('getLocalFile', data)
}

export function writeFileByPath(filePath: string[], fileContent: string) {
  return request('writeFileByPath', filePath, fileContent)
}

export function favoriteProject(data: { id: number, favorite: number}) {
  return request('favoriteProject', data)
}
