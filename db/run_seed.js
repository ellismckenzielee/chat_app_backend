const seed = require("./seed");
const data = require("./data/dev.data");
const { mongoose, User } = require("../db/connection");

seed(data).then(() => {
  mongoose.connection.close();
});
