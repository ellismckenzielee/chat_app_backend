const fastify = require("fastify");
const dbConnector = require("./db/db-connector");
const routes = require("./routes/routes");
function build(opts = {}) {
  const app = fastify(opts);
  app.register(dbConnector);
  app.register(routes);
  return app;
}

module.exports = build;
