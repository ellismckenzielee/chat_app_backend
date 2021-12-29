const fastify = require("fastify");
const { mongoose, User } = require("./db/connection");

function build(opts = {}) {
  const app = fastify(opts);
  app.register(require("fastify-mongodb"), {
    forceClose: true,
    url: process.env.URL,
  });
  app.get("/", (req, res) => {
    console.log("in / route");
    res.code(200).send({ hello: "world" });
  });
  app.get("/users", (req, res) => {
    console.log("in users route");
    User.find()
      .then((res) => {
        return res;
      })
      .then((users) => {
        res.code(200).send({ users });
      });
  });

  app.get("/chats", (req, res) => {
    return "chats page";
  });

  app.get("*", (req, res) => {
    res.code(404).send({ msg: "Invalid URL" });
  });
  return app;
}

module.exports = build;
