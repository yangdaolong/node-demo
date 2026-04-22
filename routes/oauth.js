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
/**
 * @swagger
 * /oauth/login:
 *   post:
 *     summary: 登录
 *     description: 登录获取访问令牌
 *     tags:
 *       - 认证
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: bailong
 *               password:
 *                 type: string
 *                 default: 123456
 *     responses:
 *       200:
 *         description: 成功返回访问令牌
 *         schema:
 *           type: object
 */
router.post("/login", async (ctx, next) => {
  console.log(ctx.request);
  let { username, password } = ctx.request.body;

  let user = await UserModel.findOne({
    where: {
      username,
      password,
    },
    attributes: ["id", "username", "point", "level"],
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
  let domain = ctx.request.header.origin.match(
    /http:\/\/([\w\.]+)(:\d+)?\/?/,
  )[1];
  if (domain !== "localhost") {
    domain = domain.split(".");
    domain = domain[domain.length - 2] + "." + domain[domain.length - 1];
  }
  ctx.cookies.set("iehistoken", accessToken, {
    httpOnly: true,
    domain: domain,
  });
  ctx.body = { user: user.toJSON(), accessToken };
});
/**
 * @swagger
 * /oauth/my:
 *  get:
 *     summary: 获取当前用户信息
 *     description: 获取当前登录用户的信息
 *     tags:
 *       - 认证
 *     responses:
 *      200:
 *        description: 成功返回当前用户信息
 *        schema:
 *          type: object
 */
router.get("/my", auth, async (ctx, next) => {
  ctx.body = ctx.user;
});

module.exports = router;
