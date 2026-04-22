const Koa = require("koa");
const dayjs = require("dayjs");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const dotenv = require("dotenv");
const swagger = require("koa2-swagger-ui");
const cors = require("@koa/cors");
app.use(
  cors({
    origin: (ctx) => {
      const origin = ctx.headers.origin; // 实际生产请根据具体情况来进行规则配置
      return origin;
    },
    credentials: true,
  }),
);
dotenv.config({
  path: ["./.env", `./.env.${process.env.NODE_ENV}`],
  override: true,
});
const oauth = require("./routes/oauth");
const index = require("./routes/index");
const users = require("./routes/users");

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
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(oauth.routes(), oauth.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
