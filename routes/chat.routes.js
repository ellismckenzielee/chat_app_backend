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
            chatId: { type: "string" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      console.log("In post chat route");
      const { username } = request.params;
      const { recipientUsername } = request.body;
      console.log(username, recipientUsername);
      console.log(typeof recipientUsername);
      try {
        const chatId = await postChat(this, username, recipientUsername);
        console.log(chatId);
        reply.code(201).send({ chatId });
      } catch (err) {
        console.log(err);
        reply.code(err.code).send({ msg: err.msg });
      }
    },
  });
}

module.exports = chatRoutes;
