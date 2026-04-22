const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    // components: {
    //   securitySchemes: {
    //     cookieAuth: {
    //       type: "apiKey",
    //       in: "cookie",
    //       name: "iehistoken",
    //     },
    //   },
    // },
    info: {
      title: "API 文档示例",
      version: "1.0.0",
      description: "这是一个使用 Swagger 生成的 API 文档示例",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "本地服务器",
      },
    ],
  },
  apis: ["./routes/*.js"], // 指定 API 路由文件路径
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
