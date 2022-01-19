const fastify = require("../index");
const supertest = require("supertest");
const app = fastify();
const seed = require("../db/seed");
const data = require("../db/data/test.data");
const { mongoose } = require("../db/connection");
beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  app.close();
  return mongoose.connection.close();
});

beforeEach(() => {});
describe("testing server endpoints: ", () => {
  describe("/", () => {
    describe("GET", () => {
      it("status: 200, responds with JSON data decribing endpoints", async () => {
        await app.ready();
        return supertest(app.server)
          .get("/")
          .expect(200)
          .then(({ body }) => {
            expect(typeof body).toBe("object");
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      it("status: 200, responds with array of users", async () => {
        await app.ready();
        return supertest(app.server)
          .get("/users")
          .expect(200)
          .then(({ body }) => {
            const { users } = body;
            expect(users.length).toBe(5);
          });
      });
      it("status: 404, responds with Invalid URL", async () => {
        await app.ready();
        return supertest(app.server)
          .get("/userss")
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Invalid URL");
          });
      });
    });
    describe("POST", () => {
      it("status: 201, responds with array of users", async () => {
        const newUser = {
          name: "jamie",
          username: "jamielee",
        };
        await app.ready();
        return supertest(app.server)
          .post("/users")
          .send({ user: newUser })
          .expect(201)
          .then(({ body }) => {
            const { user } = body;
            expect(user.name).toBe(newUser.name);
            expect(user.username).toBe(newUser.username);
            expect(typeof user._id).toBe("string");
          });
      });
      it("status: 400, responds with message: bad request when passed object with missing data", async () => {
        const newUser = {
          name: "jamie",
          phoneNumber: "07875255423",
        };
        await app.ready();
        return supertest(app.server).post("/users").send({ user: newUser }).expect(400);
      });
      it("status: 400, responds with message: bad request when passed object of incorrect data type (string)", async () => {
        const newUser = "jamie";
        await app.ready();
        return supertest(app.server).post("/users").send({ user: newUser }).expect(400);
      });
      it("status: 400, responds with message: bad request when passed object of incorrect data type (number)", async () => {
        const newUser = 1234;
        await app.ready();
        return supertest(app.server).post("/users").send({ user: newUser }).expect(400);
      });
      it("status: 409, responds with message: user already exists", async () => {
        const newUser = {
          name: "ellis",
          username: "ellislee",
        };
        await app.ready();
        return supertest(app.server)
          .post("/users")
          .send({ user: newUser })
          .expect(409)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("user already exists");
          });
      });
    });
  });
  describe("/users/:username", () => {
    describe("GET", () => {
      it("status: 200, responds with user object", async () => {
        const username = "ellislee";
        await app.ready();
        return supertest(app.server)
          .get(`/users/${username}`)
          .expect(200)
          .then(({ body }) => {
            const { user } = body;
            expect(user.username).toBe(username);
            expect(typeof user.name).toBe("string");
          });
      });
      it("status: 404, responds with message user not found", async () => {
        const username = "ellislee2";
        await app.ready();
        return supertest(app.server)
          .get(`/users/${username}`)
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("user not found");
          });
      });
    });
  });
  describe("/:username/chats", () => {
    describe("GET", () => {
      it("status: 200, responds with an array of chats", async () => {
        const username = "ellislee";
        await app.ready();
        return supertest(app.server)
          .get(`/${username}/chats`)
          .expect(200)
          .then(({ body }) => {
            const { chats } = body;
            expect(chats.length).toBe(2);
          });
      });
    });
    describe("POST", () => {
      it("status: 201, responds with new chatId and users", async () => {
        const username = "ellislee";
        const recipientUsername = "coreylee";
        await app.ready();
        return supertest(app.server)
          .post(`/${username}/chats`)
          .send({ recipientUsername })
          .expect(201)
          .then(({ body }) => {
            const { chat } = body;
            const { _id, users } = chat;
            console.log(body);
            expect(typeof _id).toBe("string");
            expect(users.length).toBe(2);
          });
      });
      it("status: 404, responds with user not found if recipient does not exist", async () => {
        const username = "ellislee";
        const recipientUsername = "flea";
        await app.ready();
        return supertest(app.server)
          .post(`/${username}/chats`)
          .send({ recipientUsername })
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("recipient does not exist");
          });
      });
      it("status: 400, responds with chat already exists", async () => {
        const username = "ellislee";
        const recipientUsername = "zoeharries";
        await app.ready();
        return supertest(app.server)
          .post(`/${username}/chats`)
          .send({ recipientUsername })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("chat already exists");
          });
      });
      it("status: 400, recipientUsername of type integer", async () => {
        const username = "ellislee";
        const recipientUsername = 123;
        await app.ready();
        return supertest(app.server).post(`/${username}/chats`).send({ recipientUsername }).expect(400);
      });
      it("status: 400, missing recipientUsername in body", async () => {
        const username = "ellislee";
        await app.ready();
        return supertest(app.server).post(`/${username}/chats`).expect(400);
      });
    });
  });
  describe("/:username/chats/:chatId", () => {
    describe("GET", () => {
      it("status: 200, responds with an array of messages", async () => {
        const username = "ellislee";
        const chatId = 1;
        await app.ready();
        return supertest(app.server)
          .get(`/${username}/chats/${chatId}`)
          .expect(200)
          .then(({ body }) => {
            const { messages } = body;
            expect(messages.length).toBe(3);
          });
      });
    });
  });
});
