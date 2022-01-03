const fastifyPlugin = require("fastify-plugin");
const { postMessage } = require("../models/chats.models");
const socketPlugin = async (fastify, options) => {
  fastify.io.on("connection", (socket) => {
    socket.on("join", (chatId) => {
      socket.join(chatId);
      socket.emit("joined", chatId);
      socket.room = chatId;
      console.log("ROOM", socket.room);
    });
    socket.on("moveroom", () => {
      console.log("moveroom");
      socket.leave(socket.room);
    });
    socket.on("disconnect", () => {
      console.log("goodbye");
    });
    socket.on("message", async (message) => {
      console.log("message", message);
      const response = await postMessage(fastify, message);
      console.log("RESPONSE", response);
    });
  });
};

module.exports = fastifyPlugin(socketPlugin);
