async function getChatsByUsername(app, username) {
  console.log("in getChatsByUsername");
  console.log(username);
  const chats = app.mongo.db.collection("chats");
  const result = await chats.find({ users: username }).sort().toArray();
  return result;
}

module.exports = { getChatsByUsername };
