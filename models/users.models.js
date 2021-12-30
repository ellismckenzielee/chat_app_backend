async function getUsers(app) {
  const users = app.mongo.db.collection("users");
  const result = await users.find().sort().toArray();
  return result;
}

async function postUser(app, user) {
  const users = app.mongo.db.collection("users");
  const newUser = users.insert(user);
  return newUser;
}
module.exports = { getUsers, postUser };
