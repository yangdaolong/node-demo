import router_ from "koa-router";
import { PanModel } from "../models/index.js";
const router = router_();
router.prefix("/pan");

/**
 * @swagger
 * /pan/:
 *  get:
 *   summary: 获取所有pan
 *   description: 获取所有pan信息
 *   tags:
 *     - pan
 *   responses:
 *     200:
 *       description: 成功获取所有用户信息
 *       schema:
 *         type: array
 *         items:
 *           type: object
 */
router.get("/", async function (ctx, next) {
  let res = await PanModel.findAll();
  ctx.body = res;
});
/**
 * @swagger
 * /pan/:
 *  post:
 *   summary: 创建pan
 *   description: 创建pan信息
 *   tags:
 *     - pan
 *   parameters:
 *     - name: name
 *       in: query
 *       required: true
 *       type: string
 *       description: 用户名
 *   responses:
 *     200:
 *       description: 成功创建用户信息
 *       schema:
 *         type: object
 */
router.post("/pan", async function (ctx, next) {
  let { name } = ctx.request.query;
  let res = await PanModel.create({
    name,
  });
  ctx.body = res;
});

export default router;
