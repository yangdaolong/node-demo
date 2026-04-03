const dotenv = require("dotenv");

dotenv.config({
  path: ["./.env", `./.env.${process.env.NODE_ENV}`],
  override: true,
});

const sequelize = require("./seq.js");

const fs = require("fs");
const path = require("path");

const models = fs.readdirSync(path.join(__dirname, "../models"));
models.forEach((model) => {
  if (model !== "seq.js" && model !== "createdatebase.js") {
    require(path.join(__dirname, "../models", model))(sequelize);
  }
});

(async () => {
  await sequelize.sync({
    alter: true, //检查表的当前状态，并根据模型定义进行必要的更改，而不会删除现有数据
    // force: true // force: true 将删除现有表并重新创建
  });
})();
