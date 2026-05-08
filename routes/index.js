const router = require("koa-router")();

import { BookModel, CateModel, UserModel } from "../models/index.js";

const dayjs = require("dayjs");

const auth = require("../middleware/auth.js");
const jwt = require("jsonwebtoken");
const swaggerUI = require("koa2-swagger-ui").koaSwagger;
const swaggerSpec = require("../swagger");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 获取用户列表
 *     description: 获取所有用户列表
 *     tags:
 *       - 用户
 *     responses:
 *      200:
 *        description: 成功返回用户列表
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: 用户 ID
 *                  username:
 *                    type: string
 *                    description: 用户名
 *                  book_models:
 *                    type: array
 *                    description: 用户的书籍列表
 *                    items:
 *                      type: object
 *
 * */
router.get("/users", async (ctx, next) => {
  let userList = await UserModel.findAll({
    include: [
      {
        model: BookModel,
      },
    ],
    order: [["id", "ASC"]],
  });
  global.myGlobalVar = "Hello, xiaoyu!";

  ctx.body = { userList, user: ctx.user };
});
/**
 * @swagger
 * /useradd:
 *   post:
 *     summary: 添加用户
 *     description: 添加用户到数据库
 *     tags:
 *       - 用户
 *     parameters:
 *       - name: username
 *         in: query
 *         required: true
 *         type: string
 *         description: 用户名
 *       - name: password
 *         in: query
 *         required: true
 *         type: string
 *         description: 密码
 *       - name: point
 *         required: true
 *         in: query
 *         type: integer
 *         description: 积分
 *       - name: level
 *         in: query
 *         required: true
 *         type: integer
 *         description: 数等级
 *     responses:
 *       200:
 *         description: 成功返回添加的用户
 *         schema:
 *           type: object
 */
router.post("/useradd", async (ctx, next) => {
  let { username, password, point, level } = ctx.request.query;

  let res = await UserModel.create({
    username,
    password,
    point,
    level,
  });
  ctx.body = res;
});
/**
 * @swagger
 * /userUpdate:
 *  post:
 *   summary: 更新用户信息
 *   description: 根据用户ID更新用户信息
 *   tags:
 *     - 用户
 *   parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       type: integer
 *       description: 用户ID
 *     - name: username
 *       in: query
 *       required: true
 *       type: string
 *       description: 用户名
 *     - name: password
 *       in: query
 *       required: true
 *       type: string
 *       description: 密码
 *     - name: point
 *       required: true
 *       in: query
 *       type: integer
 *       description: 积分
 *     - name: level
 *       required: true
 *       in: query
 *       type: integer
 *       description: 数等级
 *   responses:
 *     200:
 *       description: 成功更新用户信息
 *       schema:
 *         type: object
 * */
router.post("/userUpdate", async (ctx, next) => {
  let { id, username, password, point, level } = ctx.request.query;
  let res = await UserModel.update(
    {
      username,
      password,
      point,
      level,
    },
    {
      where: {
        id,
      },
    },
  );
  ctx.body = res;
});
/**
 * @swagger
 * /userdelete:
 *  get:
 *   summary: 删除用户
 *   description: 根据用户ID删除用户
 *   tags:
 *     - 用户
 *   parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       type: integer
 *       description: 用户ID
 *   responses:
 *     200:
 *       description: 成功删除用户
 *       schema:
 *         type: object
 */
router.get("/userdelete", async function (ctx, next) {
  let { id } = ctx.request.query;
  let res = await UserModel.destroy({
    where: {
      id,
    },
  });
  ctx.body = res;
});

/**
 * @swagger
 * /books:
 *  get:
 *   summary: 获取书籍列表
 *   description: 获取所有书籍列表
 *   tags:
 *     - 书籍
 *   responses:
 *    200:
 *      description: 成功返回书籍列表
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: 书籍 ID
 *                name:
 *                  type: string
 *                  description: 书籍名称
 *                userid:
 *                  type: integer
 *                  description: 用户 ID
 *                cateid:
 *                  type: integer
 *                  description: 分类 ID
 *                created_at:
 *                  type: string
 *                  description: 创建时间
 *                updated_at:
 *                  type: string
 *                  description: 更新时间
 */
router.get("/books", async (ctx, next) => {
  let bookList = await BookModel.findAll({
    where: {
      // userid: 1,
    },
    include: [
      {
        model: UserModel,
        attributes: ["username"],
      },
      {
        model: CateModel,
      },
    ],
    order: [["id", "ASC"]],
  });

  ctx.body = bookList;
});
/**
 * @swagger
 * /bookadd:
 *  post:
 *   summary: 添加书籍
 *   description: 添加书籍到数据库
 *   tags:
 *     - 书籍
 *   parameters:
 *     - name: name
 *       in: query
 *       required: true
 *       type: string
 *       description: 书籍名称
 *     - name: username
 *       in: query
 *       required: true
 *       type: string
 *       description: 用户名
 *     - name: label
 *       in: query
 *       required: true
 *       type: string
 *       description: 分类名称
 *   responses:
 *     200:
 *       description: 成功返回添加的书籍
 *       schema:
 *         type: object
 */
router.post("/bookadd", async (ctx, next) => {
  let { name, username, label } = ctx.request.query;
  let res = await BookModel.create(
    {
      name,
      user_model: {
        username: username,
        password: username,
      },
      cate_model: {
        label: label,
        desc: label,
      },
    },
    {
      include: [
        {
          model: UserModel,
        },
        {
          model: CateModel,
        },
      ],
    },
  );
  ctx.body = res;
});
/**
 * @swagger
 * /cateadd:
 *  post:
 *    summary: 添加分类
 *    description: 添加分类到数据库
 *    tags:
 *      - 书籍
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              label:
 *                type: string
 *                description: 分类名称
 *                default: 默认分类
 *              desc:
 *                type: string
 *                description: 分类描述
 *                default: 默认分类描述
 *    responses:
 *      200:
 *        description: 成功返回添加的分类
 *        schema:
 *          type: object
 */
router.post("/cateadd", async (ctx, next) => {
  let { label, desc } = ctx.request.body;
  let res = await CateModel.create({
    label,
    desc,
  });
  ctx.body = res;
});

router.get(
  "/docs",
  swaggerUI({
    routePrefix: false,
    swaggerOptions: {
      spec: swaggerSpec,
      showRequestHeaders: true,
      withCredentials: true,
    },
  }),
);

module.exports = router;
