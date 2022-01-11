const users = [
  { name: "Ellis", username: "ellislee" },
  { name: "Zoe", username: "zoeharries" },
  { name: "Harry", username: "harrywaterworth" },
  { name: "Corey", username: "coreylee" },
  { name: "eddie", username: "eddievedder" },
  { name: "batman", username: "batman" },
];

const chats = [{ users: ["ellislee", "zoeharries"] }, { users: ["ellislee", "harrywaterworth"] }];

const messages = [
  { sender: "ellislee", message: "Hello from Ellis!", sent: new Date() },
  { sender: "zoeharries", message: "Hello Ellis!!!", sent: new Date() },
  { sender: "ellislee", message: "Good morning Harry.", sent: new Date() },
  { sender: "ellislee", message: "Welcome to the warzone!", sent: new Date() },
  { sender: "harrywaterworth", message: "Morning.", sent: new Date() },
];
module.exports = { users, chats, messages };
