// db.ts
import Dexie, { type EntityTable } from 'dexie';
import { type ISysConfig }  from './config'

const db = new Dexie('FriendsDatabase') as Dexie & {
  sysConfig: EntityTable<ISysConfig, 'id'> // primary key "id" (for the typings only)>;
};

db.version(2).stores({
  sysConfig: '++id, sysConfigFilePath, userConfigFilePath, appRootPath'
});

export default db
