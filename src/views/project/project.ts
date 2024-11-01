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
  projectDetailId: string
  projectName: string // 項目名称
  adcd: string // 行政区划分类
  folderPath: string // 项目所在文件夹路径
  remark: string // 备注
  exeId: string // 启动项目的工具 id 另一张表
  taskId: string // 项目任务清单
  gitUrl: string // 仓库地址
  state: string // 项目状态 完结、开发中、归档
  projectDevUrl: string // 访问地址dev
  projectProdUrl: string // 访问地址prod
}

interface ProjectDetail {
  id: number
  remark: string // 备注
}

