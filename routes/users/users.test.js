const request = require("supertest");
const server = require("../../server/server.js");

const DB = require("./user-model.js");
//ABOVE IS TO TEST MODEL FUNCTIONS WHEN NEEDED

describe("Users Testing Suite", () => {
  describe("GET to /api/users", () => {
    it("should return status 200", () => {
      request(server)
        .get("/api/users")
        .expect(200);
    });
    it("should return data in JSON format", () => {
      request(server)
        .get("/api/users")
        .expect(/json/);
    });
  });
  describe("findUsersByType() Model Function", () => {
    it("should return some data", async () => {
      let userList = [];
      jest.setTimeout(30000);
      expect(userList.length).toBe(0);
      userList = await DB.findByUserType(0);
      expect(userList.length).not.toBe(0);
    });
  });
  describe("find() Model Function", () => {
    it("should return some data", async () => {
      let userList = [];
      jest.setTimeout(30000);
      expect(userList.length).toBe(0);
      userList = await DB.find();
      expect(userList.length).not.toBe(0);
    });
  });
});
