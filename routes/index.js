const router = require("koa-router")();
const sequelize = require("../db/seq.js");
const UserModel = require("../models/user")(sequelize);
const BookModel = require("../models/book")(sequelize);
const CateModel = require("../models/cate")(sequelize);

const dayjs = require("dayjs");

const auth = require("../middleware/auth.js");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/users", auth, async (ctx, next) => {
  UserModel.hasMany(BookModel, {
    foreignKey: "userid",
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
  global.myGlobalVar = "Hello, xiaoyu!";

  ctx.body = { userList, hostname: ctx.hostname };
});
router.get("/useradd", async (ctx, next) => {
  let res = await UserModel.create({
    username: "bailong",
    password: "123456",
    point: 0,
  });
  ctx.body = res;
});
router.get("/userUpdate", async (ctx, next) => {
  let token = ctx.cookies.get("token");

  let res = await UserModel.update(
    {
      username: "bailong",
      password: "111111",
      point: 110,
    },
    {
      where: {
        id: 1,
      },
    },
  );
  ctx.body = { res, token };
});
router.get("/json", async (ctx, next) => {
  let bookList = await BookModel.findAll({
    where: {
      userid: 2,
    },
    include: [
      {
        model: UserModel,
      },
      {
        model: CateModel,
      },
    ],
  });

  ctx.body = { bookList };
});

router.get("/bookadd", async (ctx, next) => {
  let res = await BookModel.create({
    name: "book1",
    userid: 1,
  });
  ctx.body = res;
});

router.get("/env", async (ctx, next) => {
  ctx.body = process.env;
});

module.exports = router;
