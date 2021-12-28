const fastify = require("../index");
const seed = require("../db/seed");
const supertest = require("supertest");
const app = fastify();

afterAll(async () => {
  app.close();
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
});
