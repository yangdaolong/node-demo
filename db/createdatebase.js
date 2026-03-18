const sequelize = require("./seq.js");

const UserModel = require("../models/user")(sequelize);
const BookModel = require("../models/book")(sequelize);
const CateModel = require("../models/cate")(sequelize);
const ProductModel = require("../models/product")(sequelize);

(async () => {
  await sequelize.sync({ force: true }); // force: true 将删除现有表并重新创建
})();
