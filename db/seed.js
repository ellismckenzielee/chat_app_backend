const { mongoose, User, Chat } = require("../db/connection");

function seedDb({ users, chats }) {
  return User.collection
    .drop()
    .then(() => {
      return User.insertMany(users);
    })
    .then(() => {
      return Chat.collection.drop();
    })
    .then(() => {
      console.log(chats);
      return Chat.insertMany(chats);
    })
    .then(console.log);
}
module.exports = seedDb;
