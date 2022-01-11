const fastifyPlugin = require("fastify-plugin");
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: "test.env",
  });
} else {
  dotenv.config({
    path: "prod.env",
  });
}
async function dbConnector(fastify, options) {
  console.log(process.env.URL);
  fastify.register(require("fastify-mongodb"), {
    url: process.env.URL || process.env.DBURL,
  });
}

module.exports = fastifyPlugin(dbConnector);
