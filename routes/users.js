const router = require("koa-router")();
const sequelize = require("../db/seq.js");
const UserModel = require("../models/user")(sequelize);
router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", async function (ctx, next) {
  let res = await UserModel.findAll();
  ctx.body = res;
});

module.exports = router;
