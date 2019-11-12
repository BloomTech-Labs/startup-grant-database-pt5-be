const DB = require("./categories_model.js");

describe("Category Testing Suite", () => {
  it("should return nine categories", async () => {
    let categories = [];
    expect(categories.length).toBe(0);
    categories = await DB.find();
    //BELOW ASSERTION MAY NEED TO CHANGE IF
    //CATEGORIES ARE ADDED
    expect(categories.length).toBe(9);
  });
});
