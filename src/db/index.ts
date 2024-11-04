// db.ts
import Dexie, { type EntityTable } from 'dexie'
import { type ISysConfig } from './config'
import { type IStarter } from './starter'
import { type IProject } from '@/db/project'


const db = new Dexie('FriendsDatabase') as Dexie & {
  sysConfig: EntityTable<ISysConfig, 'id'> // primary key "id" (for the typings only)>;
  starter: EntityTable<IStarter, 'id'> // primary key "id" (for the typings only)>;
  project: EntityTable<IProject, 'id'> // primary key "id" (for the typings only)>;
}

db.version(2)
  .stores({
    sysConfig: '++id, sysConfigFilePath, userConfigFilePath, appRootPath',
    starter: '++id, path, iconPath',
    project: '++id, projectName, folderPath, exeId, gitUrl, projectDevUrl, projectProdUrl, remark, adName, adcd, state',
})

export default db
