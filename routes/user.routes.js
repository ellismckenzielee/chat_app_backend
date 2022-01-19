const { getUsers, postUser, getUserByUsername } = require("../models/users.models");

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
      const users = await getUsers(this);
      reply.send({ users });
    },
  });
  app.route({
    method: "POST",
    url: "/users",
    schema: {
      body: {
        user: {
          type: "object",
          name: { type: "string" },
          username: { type: "string" },
          required: ["name", "username"],
        },
      },
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
      const { user } = request.body;
      try {
        const newUser = await postUser(this, user);
        reply.code(201).send({ user: newUser });
      } catch (err) {
        reply.code(err.code).send({ msg: err.msg });
      }
    },
  });
  app.route({
    method: "GET",
    url: "/users/:username",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                _id: { type: "string" },
                img: { type: "string" },
                name: { type: "string" },
                username: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { username } = request.params;
      try {
        const user = await getUserByUsername(this, username);
        reply.send({ user });
      } catch (err) {
        reply.code(err.code).send({ msg: err.msg });
      }
    },
  });
}

module.exports = userRoutes;
