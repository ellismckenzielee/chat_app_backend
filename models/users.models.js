async function getUsers(app) {
  const users = app.mongo.db.collection("users");
  const result = await users.find().sort().toArray();
  return result;
}

async function postUser(app, user) {
  const users = app.mongo.db.collection("users");
  console.log(user);
  const foundUser = await users.findOne({ username: user.username });
  if (foundUser) {
    return Promise.reject({ code: 409, msg: "user already exists" });
  }
  const { insertedId: id } = await users.insertOne(user);
  const newUser = await users.findOne({ _id: id });
  return newUser;
}

async function getUserByUsername(app, username) {
  const users = app.mongo.db.collection("users");
  console.log(username);
  const user = await users.findOne({ username: username });
  if (!user) {
    return Promise.reject({ code: 404, msg: "user not found" });
  }
  return user;
}
module.exports = { getUsers, postUser, getUserByUsername };
