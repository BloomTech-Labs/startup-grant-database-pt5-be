// const request = require("supertest");
// const server = require("../../server/server.js");

const DB = require("./states_model.js");

describe("States/Cities Testing Suite", () => {
  describe("find() Model Function", () => {
    it("should return some data", async () => {
      let states = [];
      jest.setTimeout(30000);
      expect(states.length).toBe(0);
      states = await DB.find();
      expect(states.length).toBe(51);
    });
  });
});
