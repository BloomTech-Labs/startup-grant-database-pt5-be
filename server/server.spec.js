const request = require("supertest");
const server = require("./server.js");

describe("Main Suite", () => {
  it("should return status 200 OK", async () => {
    const response = await request(server)
      .get("/")
      .expect(200);
  });
  it("should return 'text/html'", async () => {
    const text = await request(server).get("/");
    // console.log(text);
    expect(text.type).toBe("text/html");
  });
});
