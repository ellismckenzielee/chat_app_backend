const { getUsers } = require("../models/users.models");

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
}

module.exports = userRoutes;
