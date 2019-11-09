const request = require("supertest");
const server = require("../../server/server.js");

const DB = require("./grants_model.js");

describe("Grants Testing Suite", () => {
  describe("GET to /api/grants", () => {
    it("should return status 200", () => {
      request(server)
        .get("/api/grants")
        .expect(200);
    });
    it("should return JSON", () => {
      request(server)
        .get("/api/grants")
        .expect(/json/);
    });
  });
  describe("find() Model Function", () => {
    it("should return some data", async () => {
      let grants = [];
      jest.setTimeout(30000);
      expect(grants.length).toBe(0);
      grants = await DB.find();
      //   console.log(grants);
      //ADD .not() METHOD TO ASSERTION BELOW
      expect(grants.length).not.toBe(0);
    });
  });
});
