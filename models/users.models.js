async function getUsers(app) {
  const users = app.mongo.db.collection("users");
  const result = await users.find().sort().toArray();
  return result;
}

async function postUser(app, user) {
  const users = app.mongo.db.collection("users");
  console.log(user);
  const { insertedId: id } = await users.insertOne(user);
  const newUser = await users.findOne({ _id: id });
  return newUser;
}
module.exports = { getUsers, postUser };
