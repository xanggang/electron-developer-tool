import { IStarter } from '#vo/Starter'
import DB from '../DBConnect'
import logger from '../../common/logger'

// 启动器
class StarterDb {
  // 创建表
  static async crateTable() {
    const exists = await DB.schema.hasTable('starter')
    if (!exists) {
      logger.info('创建starter表')
      DB.schema.createTable('starter', (table: any) => {
        table.increments('id').primary()
        table.string('exePath', 255)
        table.text('icon')
        table.timestamps(true, true) // 创建自动更新的created_at和updated_at字段
      })
        .then(() => {
          logger.info('创建starter表成功')
        })
        .catch((e) => {
          logger.info('创建starter表失败')
          logger.error(e)
        })
    }
  }

  static async getAll() {
    const list = await DB('starter').select().orderBy('id', 'desc') as IStarter[]
    return list
  }

  // 插入数据
  static async crate(starter: IStarter) {
    const detail = await DB('starter').insert(starter)
    return detail
  }

  static async delete(id: number) {
    return DB('starter')
      .where('id', '=', id)
      .del()
  }

  // 查询单个
  static async find(id: number): Promise<IStarter | null> {
    const row = await DB('starter').select().where({ id })
    if (row.length) {
      return row[0]
    }
    return null
  }
}

export default StarterDb
