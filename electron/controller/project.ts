import { handle, on } from '../decorator/ipc'
import { projectDb } from '../database'
import { IProject, ICreateProjectVo } from '#vo/ProjectVo'

export class ProjectController {

  // 查询全部
  @handle
  static async getAllProjectList(data) {
    const res = await projectDb.getList()
    return {
      list: res,
      data
    }
  }

  // 插入数据
  @handle
  static async createProject(project: ICreateProjectVo) {
    const res = await projectDb.crate(project)
    return res
  }
}
