import { IStarter } from '#vo/Starter'
import { app } from 'electron'
import { handle } from '../decorator/ipc'
import { StarterDb } from '../database'

export class StarterController {
  // 通过exepath获取对应的图标
  @handle
  static async getExeIconByPath(exePath: string) {
    const appIconDataURL = await app
      .getFileIcon(exePath, { size: 'large' })
      .then((icon) => icon.toDataURL())
    return appIconDataURL
  }

  // 查询全部
  @handle
  static async getAllStarter(): Promise<IStarter[]> {
    const res = await StarterDb.getAll()
    return res
  }

  // 插入数据
  @handle
  static async createStarter(starter: IStarter) {
    const res = await StarterDb.crate(starter)
    return res
  }

  // 插入数据
  @handle
  static async deleteStarter(id: number) {
    const res = await StarterDb.delete(id)
    return res
  }
}
