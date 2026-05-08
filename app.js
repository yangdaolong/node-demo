import cors from "@koa/cors";
import dayjs from "dayjs";
import Koa from "koa";
import bodyparser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import onerror from "koa-onerror";
import views from "koa-views";
import index from "./routes/index";
import oauth from "./routes/oauth";
import users from "./routes/users";
const app = new Koa();
app.use(
  cors({
    origin: (ctx) => {
      const origin = ctx.headers.origin; // 实际生产请根据具体情况来进行规则配置
      return origin;
    },
    credentials: true,
  }),
);

Date.prototype.toJSON = function () {
  return dayjs(this).format("YYYY-MM-DD HH:mm:ss");
};

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  }),
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  }),
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(oauth.routes(), oauth.allowedMethods());
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
