const { getUsers } = require("../models/users.models");
async function routes(app, options) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
    handler: function (request, reply) {
      reply.send({ hello: "world" });
    },
  });
  app.route({
    method: "GET",
    url: "/users",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            users: { type: "array" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      console.log("in users controller");
      const users = await getUsers(this);
      reply.send({ users });
    },
  });

  app.route({
    method: "GET",
    url: "*",
    schema: {
      response: {
        404: {
          type: "object",
          properties: {
            msg: { type: "string" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      console.log("in catch all handler");
      reply.code(404).send({ msg: "Invalid URL" });
    },
  });
}

module.exports = routes;
