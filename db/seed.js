const { mongoose, User } = require("../db/connection");
console.dir(mongoose);

function seedDb() {
  const users = [
    { name: "Ellis", username: "ellislee" },
    { name: "Zoe", username: "zoeharries" },
    { name: "Harry", username: "harrywaterworth" },
    { name: "Corey", username: "coreylee" },
  ];
  return User.collection.drop().then(() => {
    return User.insertMany(users);
  });
}
module.exports = seedDb;
