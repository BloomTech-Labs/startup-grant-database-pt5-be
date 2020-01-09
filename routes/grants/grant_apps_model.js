const db = require("../../database/DbConfig.js");

module.exports = {
  find,
  findById,
  add,
  createStatus,
  updateStatus
};

// returns all grants
function find() {
  return db("grant_applications");
}

// returns a grant's applications
function findById(grantId) {
  return db("grant_applications").where({ grant_id: grantId });
}

// creates a new row in the grants_applications table
function add(application) {
  return db("grant_applications").insert(application);
}

// below updates the application status from the grantor dashboard
function updateStatus(applicationId, newStatus) {
  // the new status must be an integer because we used keys
  return db("grant_applications")
    .update({ status: newStatus })
    .where({ id: applicationId });
  // .then(function(count) {
  //   console.log(count);
  // });
}

// BELOW ENDPOINT SHOULD NEVER BE HIT MORE THAN 3 TIMES
// ONLY NEEDED TO CREATE THE STATUS KEYS

function createStatus(status) {
  return db("application_status").insert(status);
}
