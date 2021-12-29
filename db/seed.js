const { mongoose, User } = require("../db/connection");

function seedDb(users) {
  return User.collection.drop().then(() => {
    return User.insertMany(users);
  });
}
module.exports = seedDb;
