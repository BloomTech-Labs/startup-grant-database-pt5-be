const db = require("../../database/DbConfig.js");

module.exports = {
  find,
  findById
};

function find() {
  return db("grant_applications");
}

function findById(recipientId) {
  return db("grant_applications").where({ id: recipientId });
}
