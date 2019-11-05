const request = require("supertest");
const server = require("./server.js");

describe("Home Route", () => {
  it("should return status 200", () => {
    request(server)
      .get("/")
      .expect(200);
  });
  it("should return 'text/html' formatted data", () => {
    request(server)
      .get("/")
      .expect("text/html");
  });
});
