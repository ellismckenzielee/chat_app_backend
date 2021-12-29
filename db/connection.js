const mongoose = require("mongoose");
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: "test.env",
  });
} else {
  dotenv.config({
    path: "prod.env",
  });
}
mongoose.connect(process.env.URL);
const User = mongoose.model("User", { name: String, username: String });
const Chat = mongoose.model("Chat", { users: Array });
module.exports = { mongoose, User, Chat };
