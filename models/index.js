import sequelize from "../db/seq.js";

const UserModel = require("./user.js")(sequelize);
const BookModel = require("./book.js")(sequelize);
const CateModel = require("./cate.js")(sequelize);
const PanModel = require("./pan.js")(sequelize);
// 在这里定义模型之间的关系

UserModel.hasMany(BookModel, {
  foreignKey: "userid",
  onDelete: "CASCADE",
});
BookModel.belongsTo(UserModel, {
  foreignKey: "userid",
  onDelete: "CASCADE",
});
BookModel.belongsTo(CateModel, {
  foreignKey: "cateid",
  onDelete: "CASCADE",
});
CateModel.hasMany(BookModel, {
  foreignKey: "cateid",
  onDelete: "CASCADE",
});

export { BookModel, CateModel, PanModel, sequelize, UserModel };
