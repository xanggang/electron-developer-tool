// 创建项目的基础路径
/**
 * project
 * - home // 源代码
 * - design // 设计
 * - document // 文档
 * - task // 任务
 */


interface Project {
  id: number // 主箭
  projectName: string // 項目名称，
  folderPath: string // 项目所在文件夹路径， git的最后一段
  exeId: string // 启动项目的工具 id 另一张表
  gitUrl: string // 仓库地址
  projectDevUrl: string // 访问地址dev
  projectProdUrl: string // 访问地址prod
  remark: string // 备注
  adName: string // 备注
  adcd: string // 行政区划分类

  // taskId: string // 项目任务清单
  // state: string // 项目状态 完结、开发中、归档
}

interface ProjectDetail {
  id: number
  remark: string // 备注
}

