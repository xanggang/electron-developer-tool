import db from './index'

export interface ISysConfig {
  id?: number
  // 配置文件存放地址
  sysConfigFilePath: string
  // 用户文件地址
  userConfigFilePath: string
  // 应用程序目录
  appRootPath: ''
}


export default class SysConfigDb {

  static baseSet(data: ISysConfig) {
    db.sysConfig.add(data)
  }

  static baseGet() {
    return db.sysConfig.toArray()
  }
}
