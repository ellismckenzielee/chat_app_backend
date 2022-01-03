const { getChatsByUsername, getMessagesByChatId } = require("../models/chats.models");

async function chatRoutes(app, options) {
  app.route({
    method: "GET",
    url: "/:username/chats",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            chats: { type: "array" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { username } = request.params;
      const chats = await getChatsByUsername(this, username);
      reply.code(200).send({ chats });
    },
  });
  app.route({
    method: "GET",
    url: "/:username/chats/:chatId",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            messages: { type: "array" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { username, chatId } = request.params;
      const messages = await getMessagesByChatId(this, chatId);
      reply.code(200).send({ messages });
    },
  });
}

module.exports = chatRoutes;
