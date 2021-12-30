const { mongoose, User, Chat, Message } = require("../db/connection");

function seedDb({ users, chats, messages }) {
  return User.collection
    .drop()
    .then(() => {
      return User.insertMany(users);
    })
    .then(() => {
      return Chat.collection.drop();
    })
    .then(() => {
      return Chat.insertMany(chats);
    })
    .then(() => {
      return Message.collection.drop();
    })
    .then(() => {
      return Message.insertMany(messages);
    });
}
module.exports = seedDb;
