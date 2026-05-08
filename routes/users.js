import router_ from "koa-router";
import { UserModel } from "../models/index.js";
const router = router_();
router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", async function (ctx, next) {
  let res = await UserModel.findAll();
  ctx.body = res;
});

export default router;
