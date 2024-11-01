import StarterDb, { IStarter } from '@/db/starter'
import { message } from 'ant-design-vue'

// 将一个启动器保存到数据库
export async function saveStarter(data: IStarter) {
  try {
    await StarterDb.baseSet(data)
    return true
  } catch (e) {
    message.error('查询错误')
    throw Error(e)
  }
}

export async function getAllStarter() {
  try {
    const res = await StarterDb.getAll() as IStarter[]
    return res
  } catch (e) {
    message.error('查询错误')
    throw Error(e)
  }
}
