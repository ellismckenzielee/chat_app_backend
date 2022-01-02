const { chats } = require("../db/data/test.data");

async function getChatsByUsername(app, username) {
  console.log("in getChatsByUsername");
  const chats = app.mongo.db.collection("chats");
  const result = await chats.find({ users: username }).sort().toArray();
  return result;
}

async function getMessagesByChatId(app, chatId) {
  console.log("in getMessagesByChatId");
  const messages = app.mongo.db.collection("messages");
  const result = await messages.find({ chatId: chatId }).sort().toArray();
  return result;
}

async function postMessage(app, message) {
  const messages = app.mongo.db.collection("messages");
  const newMessage = await messages.insertOne({ chatId: message.chatId, sender: message.sender, message: message.message, sent: new Date() });
  return newMessage;
}
module.exports = { getChatsByUsername, getMessagesByChatId };
