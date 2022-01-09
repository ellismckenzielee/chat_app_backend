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

async function postChat(app, username, recipientUsername) {
  const chats = app.mongo.db.collection("chats");
  const users = app.mongo.db.collection("users");
  const user = await users.find({ username: recipientUsername }).sort().toArray();
  const existingChats = await chats
    .find({ users: { $all: [username, recipientUsername], $size: 2 } })
    .sort()
    .toArray();
  if (user.length === 0) {
    return Promise.reject({ code: 404, msg: "recipient does not exist" });
  } else if (existingChats.length > 0) {
    return Promise.reject({ code: 400, msg: "chat already exists" });
  }
  console.log(user);
  const chat = await chats.insertOne({ users: [username, recipientUsername] });
  return chat.insertedId.toString();
}
module.exports = { getChatsByUsername, getMessagesByChatId, postMessage, postChat };
