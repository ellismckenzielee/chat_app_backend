const fastifyPlugin = require("fastify-plugin");

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
    socket.on("message", (message) => {
      console.log("message", message);
    });
  });
};

module.exports = fastifyPlugin(socketPlugin);
