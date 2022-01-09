const users = [
  { name: "Ellis", username: "ellislee" },
  { name: "Zoe", username: "zoeharries" },
  { name: "Harry", username: "harrywaterworth" },
  { name: "Corey", username: "coreylee" },
  { name: "Eddie", username: "eddivedder" },
];

const chats = [
  { users: ["ellislee", "zoeharries"], chatId: 1 },
  { users: ["ellislee", "harrywaterworth"], chatId: 2 },
];

const messages = [
  { chatId: 1, sender: "ellislee", message: "Hello from Ellis!", sent: new Date() },
  { chatId: 1, sender: "zoeharries", message: "Hello Ellis!!!", sent: new Date() },
  { chatId: 1, sender: "ellislee", message: "Good morning Harry.", sent: new Date() },
  { chatId: 2, sender: "ellislee", message: "Welcome to the warzone!", sent: new Date() },
  { chatId: 2, sender: "harrywaterworth", message: "Morning.", sent: new Date() },
];
module.exports = { users, chats, messages };
