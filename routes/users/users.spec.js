const request = require("supertest");
const server = require("../../server/server.js");

// const DB = require("./user-model.js");

describe("Users Testing Suite", () => {
  describe("GET to /api/users", () => {
    it("should return status 200", () => {
      request(server)
        .get("/api/users")
        .expect(200);
    });
  });
});
