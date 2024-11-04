import db from './index'

enum ProjectState {
  '未初始化' = 0,
  '已初始化' = 1,
  '异常' = 1
}

// 管理项目需要用到的本地工具
export interface IProject {
  id?: number
  projectName: string // 項目名称，
  folderPath: string // 项目所在文件夹路径， git的最后一段
  exeId: string // 启动项目的工具 id 另一张表
  gitUrl: string // 仓库地址
  projectDevUrl: string // 访问地址dev
  projectProdUrl: string // 访问地址prod
  remark: string // 备注
  adName: string // 备注
  adcd: string // 行政区划分类
  state: ProjectState
}

export default class ProjectDb {
  // 保存项目
  static async baseSet(data: IProject) {
    db.project.add(data)
  }
}
