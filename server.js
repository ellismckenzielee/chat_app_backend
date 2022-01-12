const server = require("./index")({
  logger: {
    level: "info",
  },
});

server.listen(process.env.PORT, "0.0.0.0", (err, address) => {
  console.log("SERVER", process.env.PORT, server.printRoutes());
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
