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
            expect(users.length).toBe(4);
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
