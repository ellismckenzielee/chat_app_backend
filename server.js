const server = require("./index")({
  logger: {
    level: "info",
  },
});

server.listen(3000, (err, address) => {
  console.log(server.printRoutes());
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
