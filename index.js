const fastify = require("fastify");
const dbConnector = require("./db/db-connector");
const chatRoutes = require("./routes/chat.routes");
const routes = require("./routes/general.routes");
const userRoutes = require("./routes/user.routes");
function build(opts = {}) {
  const app = fastify(opts);

  app.register(require("fastify-cors"), {
    origin: "http://localhost:5500",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });
  app.register(require("fastify-socket.io"), {
    origin: "http://localhost:5500",
  });
  app.register(dbConnector);

  app.register(userRoutes);
  app.register(chatRoutes);
  app.register(routes);
  return app;
}

module.exports = build;
