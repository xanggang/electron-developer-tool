import knex from 'knex'
import { getDbPath } from '../conf/index'

let DB = undefined

export default DB;

export async function initDb() {
  DB = knex({
    client: 'sqlite3',
    connection: {
      //filename: path.join(__dirname, './rafter.sqlite3'),
      filename: getDbPath(),
    },
    pool: {
      min: 2, // 连接池中最小连接数
      max: 100 // 连接池中最大连接数
    },
    useNullAsDefault: true, // 使用NULL作为默认值
  });
}
