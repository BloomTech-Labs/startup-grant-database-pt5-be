const request = require("supertest");
const server = require("./server.js");

describe("Main Suite", () => {
  it("should return status 200 OK", async () => {
    const response = await request(server)
      .get("/")
      .expect(200);
  });
});
