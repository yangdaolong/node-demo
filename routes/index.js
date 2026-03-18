const router = require("koa-router")();
const sequelize = require("../db/seq.js");
const UserModel = require("../models/user")(sequelize);
const BookModel = require("../models/book")(sequelize);
const CateModel = require("../models/cate")(sequelize);

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/users", async (ctx, next) => {
  UserModel.hasMany(BookModel, {
    foreignKey: "userid",
  });
  BookModel.belongsTo(CateModel, {
    foreignKey: "cateid",
  });
  let userList = await UserModel.findAll({
    include: [
      {
        model: BookModel,
        include: {
          model: CateModel,
        },
      },
    ],
    order: [["id", "ASC"]],
  });
  ctx.body = userList;
});

router.get("/json", async (ctx, next) => {
  BookModel.belongsTo(UserModel, {
    foreignKey: "userid",
    targetKey: "id",
  });

  let bookList = await BookModel.findAll({
    include: {
      model: UserModel,
    },
  });
  ctx.body = bookList;
});

module.exports = router;
