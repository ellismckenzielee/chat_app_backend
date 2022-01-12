module.exports = {
  info: "endpoints for LINK backend",
  "/": {
    GET: "List of endpoints",
  },
  "/users": {
    GET: {
      info: "get all users",
      response: {
        users: [{ name: "ellis", username: "ellislee", _id: "xznvxjvnjvr34235" }],
      },
    },
    POST: {
      info: "create a new user",
      request: {
        body: {
          user: {
            name: "ellis",
            username: "ellislee",
          },
        },
      },
      response: {
        user: {
          name: "ellis",
          username: "ellislee",
          _id: "xznvxjvnjvr34235",
        },
      },
    },
  },
  "/users/:username": {
    GET: {
      info: "get a specific user by username",
      request: {
        params: {
          username: "ellislee",
        },
      },
      response: {
        user: {
          name: "ellis",
          username: "ellislee",
          _id: "xznvxjvnjvr34235",
        },
      },
    },
  },
  "/:username/chats": {
    GET: {
      info: "get all chats associated with a user",
      request: {
        params: {
          username: "ellislee",
        },
      },
      response: {
        chats: [{ _id: "sdvsdvsdvds938", users: ["ellislee", "eddievedder"] }],
      },
    },
    POST: {
      info: "create a new chat between two users",
      request: {
        params: {
          username: "ellislee",
        },
        body: {
          recipientUsername: "eddievedder",
        },
      },
    },
  },
  "/:username/chats/:chatId": {
    GET: {
      info: "get a list oef messages for a particular chat id",
      request: {
        params: {
          username: "ellislee",
          chatId: "mdobvnrbihdrbr345",
        },
      },
    },
  },
};
