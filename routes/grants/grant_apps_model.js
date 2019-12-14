const db = require("../../database/DbConfig.js");

module.exports = {
  find
};

function find() {
  console.log("Getting grant apps!");
  return db("grant_applications");
}
