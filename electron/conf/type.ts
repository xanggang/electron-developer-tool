export interface IConfig {
  loggerPath: string // 日志文件地址
  projectRoot: string // // 项目根目录
}

export type IAppConfig = Partial<IConfig>
