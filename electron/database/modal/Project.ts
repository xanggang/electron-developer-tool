import DB from "../DBConnect";
import logger from '../../common/logger'
import omit from 'lodash-es/omit'
import { IDbModel } from '../DbIna'
import { IProject, ICreateProjectVo } from '#vo/ProjectVo'

class Project extends IDbModel{

  // 创建表
  async crateTable() {
    const exists = await DB.schema.hasTable('project')
    if (!exists) {
      logger.info('创建project表')
      DB.schema.createTable('project', function (table: any) {
        table.increments('id').primary();
        table.string('projectName', 255);
        table.string('folderPath', 255);
        table.integer('exeId');
        table.string('gitUrl', 255);
        table.string('projectDevUrl', 255);
        table.string('projectProdUrl', 255);
        table.string('remark', 255);
        table.string('adName', 255);
        table.string('adcd', 255);
        table.integer('state');
        table.timestamps(true, true); // 创建自动更新的created_at和updated_at字段
      })
        .then(() => {
          logger.info('创建project表成功')
        })
        .catch(e => {
          logger.info('创建project表失败')
          logger.error(e)
        })
    }
  }

  // 插入数据
  async crate(project: ICreateProjectVo) {
    console.log({ project })
    const detail = await DB('project').insert(project)
    return detail
  }

  // 查询全部
  async getList() {
    const list = await DB('project').select().orderBy('id', 'desc') as IProject[]
    const total = await DB('project').count('* as total')
    return {
      list,
      total: total[0].total
    }
  }

  // 查询单个
  async find(id: number) {
    const row = await DB('project').select().where({ id })
    return {
      row
    }
  }

  // 编辑
  async edit(project: Partial<IProject>) {
    if (!project.id) {
      throw new Error('修改数据失败， project.id不能为空')
    }
    const info = await DB('project').update({ ...omit(project, ['id']) }).where({ id: project.id })
    return info
  }

  // 删除
  async delete(id: number) {
    const info = await DB('project').delete().where({ id })
    return true
  }
}

export default new Project()
