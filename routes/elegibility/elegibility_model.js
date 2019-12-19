const db = require("./../../database/DbConfig.js");

module.exports = {
  find,
  findById
};

function find() {
  return db("elegibility");
}

function findById(userId) {
  return db("elegibility").where({ id: userId });
}
