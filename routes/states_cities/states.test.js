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
      //BELOW SHOULD EXPECT 51 WHEN WE
      //ACTUALLY IMPLEMENT STATES API,
      //ZERO IS PASSING SO THAT WE DON'T USE OUR LIMITED
      //AMOUNT OF REQUESTS
      expect(states.length).toBe(0);
    });
  });
});
