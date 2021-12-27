const fastify = require("fastify")({ logger: true });

fastify.get("/", () => {
  return "chat backend";
});

const start = async () => {
  try {
    await fastify.listen(4040);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
