const fastify = require("fastify");
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
console.log(process.env.URL);
function build(opts = {}) {
  const app = fastify(opts);
  app.register(require("fastify-mongodb"), {
    forceClose: true,
    url: process.env.URL,
  });
  app.get("/", (req, res) => {
    console.log("in route");
    res.code(200).send({ hello: "world" });
  });

  app.get("/chats", (req, res) => {
    return "chats page";
  });
  return app;
}

module.exports = build;
