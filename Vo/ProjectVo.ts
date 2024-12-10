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
  state?: number
}

export type ICreateProjectVo = Omit<ICreateProjectVo, id>