const { getUsers } = require("../models/users.models");
const { getChatsByUsername, getMessagesByChatId } = require("../models/chats.models");
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
      console.log("IN ROUTE HANDLER");
      const routes = JSON.stringify(require("./routes.info"));
      console.log("ROUTES", routes);
      reply.send(routes);
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
