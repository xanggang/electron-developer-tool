import db from './index'

// 管理项目需要用到的本地工具
export interface IStarter {
  id?: number
  path: string
  icon: string
}

export default class StarterDb {
  // 保存一个启动器地址
  static baseSet(data: IStarter) {
    db.starter.add(data)
  }

  static async getAll() {
    return db.starter.toArray()
  }
}
