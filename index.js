const fastify = require("fastify");
const dbConnector = require("./db/db-connector");
const socketsPlugins = require("./plugins/sockets.plugins");
const chatRoutes = require("./routes/chat.routes");
const routes = require("./routes/general.routes");
const userRoutes = require("./routes/user.routes");
function build(
  opts = {
    ajv: {
      customOptions: {
        coerceTypes: false,
      },
    },
  }
) {
  const app = fastify(opts);

  app.register(require("fastify-cors"), {
    origins: ["http://localhost:3000", "https://61df2cdd2022582b7213f064--naughty-meninsky-63ca15.netlify.app/"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });
  app.register(require("fastify-socket.io"), {
    origin: "http://localhost:3000",
  });
  app.register(dbConnector);
  app.register(socketsPlugins);
  app.register(userRoutes);
  app.register(chatRoutes);
  app.register(routes);
  return app;
}

module.exports = build;
