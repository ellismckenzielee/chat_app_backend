const mongoose = require("mongoose");
const dotenv = require("dotenv");
console.log("PROCESS ENV", process.env);
if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: "test.env",
  });
} else {
  dotenv.config({
    path: "prod.env",
  });
}

const url = process.env.URL || process.env.DBURL;
mongoose.connect(url);
const User = mongoose.model("User", { name: String, username: String, img: String });
const Chat = mongoose.model("Chat", { users: Array, chatId: Number });
const Message = mongoose.model("Message", { chatId: String, sender: "string", message: "string", sent: Date });
module.exports = { mongoose, User, Chat, Message };
