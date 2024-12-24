import { IStarter } from '#vo/Starter'
import { app } from 'electron'
import { handle } from '../decorator/ipc'
import { StarterDb, ProjectDb } from '../database'
import Payload from '../common/payload'

export class StarterController {
  // 通过exepath获取对应的图标
  @handle
  static async getExeIconByPath(exePath: string) {
    const appIconDataURL = await app
      .getFileIcon(exePath, { size: 'normal' })
      .then((icon) => icon.toDataURL())
    return Payload.success(appIconDataURL)
  }

  // 查询全部
  @handle
  static async getAllStarter() {
    const res = await StarterDb.getAll()
    return Payload.success(res)
  }

  // 插入数据
  @handle
  static async createStarter(starter: IStarter) {
    const res = await StarterDb.crate(starter)
    return Payload.success(res)
  }

  // 删除数据
  @handle
  static async deleteStarter(id: number) {
    const list = await ProjectDb.getListByStartId(id)
    if (list.length) {
      return Payload.error(`存在关联的项目${list.map((item) => item.projectName).join(',')}不能删除`)
    }
    await StarterDb.delete(id)
    return Payload.success(true)
  }
}
