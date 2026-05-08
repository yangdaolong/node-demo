const Sequelize = require("sequelize");

console.log("init sequelize...");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST, // 数据库地址
    dialect: process.env.DIALECT, // 指定数据库类型
    pool: {
      max: 5, // 最大连接数量
      min: 0, // 最小连接数量
      idle: 10000, // 如果一个线程10s内没有被使用过的话就释放
    },
    logging: true, // 显示log
    define: {
      timestamps: true,
      paranoid: true, //逻辑删除
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
      // 把驼峰命名转换为下划线
      // underscored: true,
    },
  },
);

// sequelize.sync({
//   alter: true, //检查表的当前状态，并根据模型定义进行必要的更改，而不会删除现有数据
//   force: false, // force: true 将删除现有表并重新创建
// });

//对连接进行测试，查看控制台
sequelize
  .authenticate()
  .then(() => {
    console.log("******Connection has been established successfully.********");
    // console.log("******测试结束，即将退出！！！********");
    // process.exit(); //结束进程
  })
  .catch((err) => {
    console.error(
      "***************Unable to connect to the database:***********",
      err,
    );
  });

module.exports = sequelize;
