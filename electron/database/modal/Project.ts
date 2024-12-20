import omit from 'lodash-es/omit'
import { IProject, ICreateProjectVo, IProjectSearchVo } from '#vo/ProjectVo'
import DB from '../DBConnect'
import logger from '../../common/logger'

class Project {
  // 创建表
  static async crateTable() {
    const exists = await DB.schema.hasTable('project')
    if (!exists) {
      logger.info('创建project表')
      DB.schema.createTable('project', (table: any) => {
        table.increments('id').primary()
        table.string('projectName', 255)
        table.string('folderPath', 255)
        table.integer('exeId')
        table.string('gitUrl', 255)
        table.string('projectDevUrl', 255)
        table.string('projectProdUrl', 255)
        table.string('remark', 255)
        table.string('adName', 255)
        table.string('adcd', 255)
        table.integer('state')
        table.timestamps(true, true) // 创建自动更新的created_at和updated_at字段
      })
        .then(() => {
          logger.info('创建project表成功')
        })
        .catch((e) => {
          logger.info('创建project表失败')
          logger.error(e)
        })
    }
  }

  // 插入数据
  static async crate(project: ICreateProjectVo) {
    const detail = await DB('project').insert(project)
    return detail
  }

  // 查询全部
  static async getProjectAllList(): Promise<IProject[]> {
    const list = await DB('project').select().orderBy('id', 'desc') as IProject[]
    return list
  }

  // 分页查询
  static async getProjectPageList(par: IProjectSearchVo): Promise<PageDataWrap<IProject>> {
    const rows = await DB('project')
      .select()
      .andWhere((builder) => {
        if (par.adcd) {
          builder.where('adcd', '=', par.adcd)
        }
        if (par.projectName) {
          builder.where('projectName', 'like', `%${par.projectName}%`)
        }
      })
      .orderBy('id', 'desc') as IProject[]
    const total = await DB('project')
      .select()
      .andWhere((builder) => {
        if (par.adcd) {
          builder.where('adcd', '=', par.adcd)
        }
        if (par.projectName) {
          builder.where('projectName', 'like', `%${par.projectName}%`)
        }
      })
      .count('* as total')
    return {
      rows,
      total: total[0].total as number,
    }
  }

  // 查询单个
  static async find(id: number): Promise<IProject | null> {
    const row = await DB('project').select().where({ id })
    if (!row.length) return null
    const project = row[0] as IProject
    // const exeItem = await DB('project')project.exeId
    // if (row.length) {
    //   return row[0]
    // }
    return project
  }

  // 编辑
  static async edit(project: Partial<IProject>) {
    if (!project.id) {
      throw new Error('修改数据失败， project.id不能为空')
    }
    const info = await DB('project').update({ ...omit(project, ['id']) }).where({ id: project.id })
    return info
  }

  // 删除
  static async delete(id: number) {
    const info = await DB('project').delete().where({ id })
    return true
  }
}

export default Project
