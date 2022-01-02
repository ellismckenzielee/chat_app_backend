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
    .then((response) => {
      console.log(response);

      return Promise.all([response, Message.collection.drop()]);
    })
    .then(([data]) => {
      if (!process.env.NODE_ENV) {
        console.log(data[0]._id.toString());
        messages = messages.map((message, indx) => {
          if (indx < 3) {
            message.chatId = data[0]._id.toString();
          } else {
            message.chatId = data[1]._id.toString();
          }
          return message;
        });
      }
      console.log(messages);
      return Message.insertMany(messages);
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = seedDb;
