import { IProject, ICreateProjectVo, IProjectSearchVo } from '#vo/ProjectVo'

// 打开弹窗， 获取一个文件的位置
export async function getFilePath() {
  const res = await window.ipcRenderer.invoke('getFilePath')
  return res
}

// 打开弹窗， 获取一个文件的位置
export async function getFolderPath() {
  const res = await window.ipcRenderer.invoke('getFolderPath')
  return res
}

export async function getProjectList(data: IProjectSearchVo) {
  const res = await window.ipcRenderer.invoke('getAllProjectList', data)
  return res
}

export async function getProjectPageList(data: IProjectSearchVo): Promise<PageDataWrap<IProject>> {
  const res = await window.ipcRenderer.invoke('getProjectPageList', data)
  return res
}

export async function createProject(project: ICreateProjectVo) {
  const res = await window.ipcRenderer.invoke('createProject', project)
  return res
}

export async function openProjectByStarter(id: number) {
  const res = await window.ipcRenderer.invoke('openProjectByStarter', id)
  return res
}
