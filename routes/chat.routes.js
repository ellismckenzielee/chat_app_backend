const { getChatsByUsername, getMessagesByChatId, postChat } = require("../models/chats.models");

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
  app.route({
    method: "POST",
    url: "/:username/chats",
    schema: {
      body: {
        type: "object",
        properties: {
          recipientUsername: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            chat: {
              type: "object",
              properties: {
                _id: { type: "string" },
                users: { type: "array" },
              },
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { username } = request.params;
      const { recipientUsername } = request.body;
      try {
        const chat = await postChat(this, username, recipientUsername);
        reply.code(201).send({ chat });
      } catch (err) {
        reply.code(err.code).send({ msg: err.msg });
      }
    },
  });
}

module.exports = chatRoutes;
