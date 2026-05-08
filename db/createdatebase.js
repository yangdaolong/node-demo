import { sequelize } from "../models/index.js"; //引入模型

(async () => {
  await sequelize.sync({
    alter: true, //检查表的当前状态，并根据模型定义进行必要的更改，而不会删除现有数据
    force: false, // force: true 将删除现有表并重新创建
  });
})();
