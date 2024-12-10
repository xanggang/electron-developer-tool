import Project from "./modal/Project";

class Migrate {

  //表列表
  static tableList: any[] = [
    Project
  ];

  //迁移表
  async migrateRun() {
    console.log('正在迁移数据库')
    Migrate.tableList.forEach((table) => table.crateTable())
  }


}

export default new Migrate();
