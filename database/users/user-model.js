const db = require("../DbConfig");

module.exports = {
  find
};

function find() {
  return db("users");
}
