async function routes(app, options) {
  app.get("/", (req, res) => {
    console.log("in / route");
    res.code(200).send({ hello: "world" });
  });
  app.get("/users", async (req, res) => {
    console.log("in users route");
    const users = app.mongo.db.collection("users");
    const result = await users.find().sort().toArray();
    res.code(200).send({ users: result });
  });

  app.get("/chats", (req, res) => {
    return "chats page";
  });

  app.get("*", (req, res) => {
    res.code(404).send({ msg: "Invalid URL" });
  });
}

module.exports = routes;
