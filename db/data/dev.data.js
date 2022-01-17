const users = [
  { name: "Ellis", username: "ellislee", img: "" },
  { name: "Zoe", username: "zoeharries", img: "" },
  { name: "Harry", username: "harrywaterworth", img: "" },
  { name: "Corey", username: "coreylee", img: "" },
  { name: "eddie", username: "eddievedder", img: "" },
  { name: "batman", username: "batman", img: "" },
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
