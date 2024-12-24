import Project from './modal/Project'
import Starter from './modal/Starter'
import logger from '../common/logger'

class Migrate {
  // 表列表
  static tableList: any[] = [
    Project,
    Starter,
  ]

  // 迁移表
  static async migrateRun() {
    logger.debug('正在迁移数据库')
    Migrate.tableList.forEach((table) => table.crateTable())
  }
}

export default Migrate
