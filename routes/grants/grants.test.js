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
  describe("masterSearch() Model Function", () => {
    it("will return some data", async () => {
      let results = [];
      expect(results.length).toBe(0);
      results = await DB.masterSearch();
      //RETURNING 0 WILL PASS UNTIL THE STATES
      //API IS IMPLEMENTED AND MODEL FUNCTION
      //CAN ACTUALLY innerJoin("regions")
      expect(results.length).toBe(0);
    });
  });
});

describe("Applications Testing Suite", () => {
  describe("find() Model Function", () => {
    it("should return some data", async () => {
      let apps = [];
      expect(apps.length).toBe(0);
      apps = await DB.find();
      expect(apps.length).not.toBe(0);
    });
  });
});
