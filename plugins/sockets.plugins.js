const fastifyPlugin = require("fastify-plugin");
const { Socket } = require("socket.io");
const { postMessage } = require("../models/chats.models");
const socketPlugin = async (fastify, options) => {
  const clientPool = {};
  fastify.io.on("connection", (socket) => {
    socket.on("register", (username) => {
      console.log("register");
      clientPool[username] = socket.id;
    });
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

    socket.on("newchat", (username) => {
      console.log("new chat");
      if (Object.keys(clientPool).includes(username)) {
        fastify.io.to(clientPool[username], chatId);
      }
    });

    socket.on("leave", () => {
      console.log(clientPool);
      const clientKeys = Object.keys(clientPool);
      let socketKey;
      for (let i = 0; i < clientKeys.length; i++) {
        if (clientPool[clientKeys[i]] === socket.id) {
          socketKey = clientKeys[i];
        }
      }
      delete clientPool[socketKey];
      console.log(clientPool);
    });
    socket.on("message", async (message) => {
      console.log("message", message);
      const response = await postMessage(fastify, message);
      console.log("RESPONSE", response.insertedId.toString());
      message._id = response.insertedId.toString();
      console.log(message);
      fastify.io.to(socket.room).emit("message", message);
    });
    socket.on("chat", ({ username, chat }) => {
      Object.keys(clientPool).forEach((key) => {
        if (chat.users.includes(key)) {
          console.log(key);
          socket.to(clientPool[key]).emit("chat", chat);
        }
      });
    });
  });
};

module.exports = fastifyPlugin(socketPlugin);
