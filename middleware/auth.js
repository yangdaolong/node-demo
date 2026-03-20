const jwt = require("jsonwebtoken");

const auth = async (ctx, next) => {
  let token = ctx.cookies.get("iehistoken");
  if (!token) {
    ctx.status = 401;
    ctx.body = "token is empty";
    return;
  }
  try {
    let user = jwt.verify(token, process.env.SECRET_KEY);
    ctx.user = user;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = "token is invalid";
    return;
  }
};

module.exports = auth;
