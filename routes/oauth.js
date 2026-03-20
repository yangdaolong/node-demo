const sequelize = require("../db/seq.js");
const UserModel = require("../models/user.js")(sequelize);
const router = require("koa-router")();
router.prefix("/oauth");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");

router.get("/", async (ctx, next) => {
  await ctx.render("oauth/index", {
    title: "OAuth",
  });
});

router.post("/login", async (ctx, next) => {
  let { username, password } = ctx.request.body;

  let user = await UserModel.findOne({
    where: {
      username,
      password,
    },
  });

  if (!user) {
    ctx.status = 401;
    ctx.body = "username or password is wrong";
    return;
  }
  // 生成访问令牌
  const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  ctx.cookies.set("iehistoken", accessToken, {
    httpOnly: true,
  });
  ctx.body = user;
});

router.get("/my", auth, async (ctx, next) => {
  ctx.body = ctx.user;
});

module.exports = router;
