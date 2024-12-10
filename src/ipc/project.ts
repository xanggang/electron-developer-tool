import { IProject, ICreateProjectVo } from '#vo/ProjectVo'

// 打开弹窗， 获取一个文件的位置
export async function getFilePath() {
  const res = await window.ipcRenderer.invoke('getFilePath', 'D:\\')
  return res
}

export async function getProjectList() {
  const res = await window.ipcRenderer.invoke('getAllProjectList', {
    pageNo: 1,
    pageSize: 1,
    projectName: 'projectName',
    adcd: '3301',
  })
  console.log({ res })
  return res
}

export async function createProject(project: ICreateProjectVo) {
  const res = await window.ipcRenderer.invoke('createProject', project)
  console.log({ res })
  return res
}
