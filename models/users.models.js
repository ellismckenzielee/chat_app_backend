async function getUsers(app) {
  const users = app.mongo.db.collection("users");
  const result = await users.find().sort().toArray();
  return result;
}

module.exports = { getUsers };
