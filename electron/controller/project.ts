import { ICreateProjectVo, IProject, IProjectSearchVo } from '#vo/ProjectVo'
import { handle } from '../decorator/ipc'
import { ProjectDb, StarterDb } from '../database'
import { execCommand } from '../utils/cmd'

export class ProjectController {
  // 查询全部
  @handle
  static async getAllProjectList(): Promise<IProject[]> {
    const res = await ProjectDb.getProjectAllList()
    return res
  }

  @handle
  static async getProjectPageList(data: IProjectSearchVo): Promise<PageDataWrap<IProject>> {
    return ProjectDb.getProjectPageList(data)
  }

  // 插入数据
  @handle
  static async createProject(project: ICreateProjectVo) {
    const res = await ProjectDb.crate(project)
    return res
  }

  // 用项目配置的启动器打开项目
  @handle
  static async openProjectByStarter(id: number) {
    const project = await ProjectDb.find(id)
    if (!project) throw new Error(`项目${id}不存在`)
    const { exeId } = project
    if (!exeId) throw new Error(`启动器${exeId}不存在`)
    const starter = await StarterDb.find(exeId)

    const { exePath } = starter
    const { folderPath } = project
    const res = await execCommand(`"${exePath}" "${folderPath}"`)
    return res
  }
}
