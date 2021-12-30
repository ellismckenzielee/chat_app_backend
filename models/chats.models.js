const { chats } = require("../db/data/test.data");

async function getChatsByUsername(app, username) {
  console.log("in getChatsByUsername");
  console.log(username);
  const chats = app.mongo.db.collection("chats");
  const result = await chats.find({ users: username }).sort().toArray();
  return result;
}

async function getMessagesByChatId(app, chatId) {
  console.log("in getMessagesByChatId");
  const messages = app.mongo.db.collection("messages");
  const result = await messages
    .find({ chatId: parseInt(chatId) })
    .sort()
    .toArray();
  return result;
}
module.exports = { getChatsByUsername, getMessagesByChatId };
