const fastify = require("fastify");
const dbConnector = require("./db/db-connector");
const chatRoutes = require("./routes/chat.routes");
const routes = require("./routes/general.routes");
const userRoutes = require("./routes/user.routes");
function build(opts = {}) {
  const app = fastify(opts);
  app.register(dbConnector);
  app.register(require("fastify-socket.io"));
  app.register(userRoutes);
  app.register(chatRoutes);
  app.register(routes);
  return app;
}

module.exports = build;
