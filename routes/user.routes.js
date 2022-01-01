const { getUsers, postUser } = require("../models/users.models");

async function userRoutes(app, options, done) {
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
    method: "POST",
    url: "/users",
    schema: {
      body: { user: { type: "object", name: { type: "string" }, username: { type: "string" }, required: ["name", "username"] } },
      response: {
        201: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                name: { type: "string" },
                username: { type: "string" },
                _id: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      console.log("in post user controller");
      const { user } = request.body;
      const newUser = await postUser(this, user);
      reply.code(201).send({ user: newUser });
    },
  });
}

module.exports = userRoutes;
