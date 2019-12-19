const db = require("../../database/DbConfig.js");

module.exports = {
  find,
  findById,
  add
};

// returns all grants
function find() {
  return db("grant_applications");
}

// returns a user's grants
function findById(recipientId) {
  return db("grant_applications").where({ id: recipientId });
}

// creates a new row in the grants_applications table
function add(application) {
  return db("grant_applications").insert(application);
}
