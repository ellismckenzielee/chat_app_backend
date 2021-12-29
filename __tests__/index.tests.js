const fastify = require("../index");
const supertest = require("supertest");
const app = fastify();
const seed = require("../db/seed");
const { mongoose } = require("../db/connection");
beforeEach(() => {
  return seed();
});
afterAll(() => {
  app.close();
  return mongoose.connection.close();
});

beforeEach(() => {});
console.log("ROUTES", app.server);
describe("testing server endpoints: ", () => {
  describe("/", () => {
    describe("GET", () => {
      it("status: 200, responds with JSON data decribing endpoints", async () => {
        await app.ready();
        return supertest(app.server)
          .get("/")
          .expect(200)
          .then(({ body }) => {
            console.log("RES", body);
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET", () => {
      it("status: 200, responds with JSON data decribing endpoints", async () => {
        await app.ready();
        return supertest(app.server)
          .get("/users")
          .expect(200)
          .then(({ body }) => {
            console.log("RES", body);
          });
      });
    });
  });
});
