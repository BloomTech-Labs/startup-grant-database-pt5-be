const db = require("../../database/DbConfig.js");

module.exports = {
  find,
  findById,
  getMyGrants,
  getAllApps,
  add,
  createStatus,
  updateStatus,
  getStatuses
};

// returns all grants
function find() {
  return db("grant_applications");
}

// returns a grantor's grants
function getMyGrants(grantorId) {
  return db("grants").where({ user_id: grantorId });
}

// returns a grant's applications ** not needed **
function findById(grantId) {
  return db("grant_applications").where({ grant_id: grantId });
}

// returns a grantor's applications
function getAllApps(grantorID) {
  return db("grant_applications")
    .join("grants", "grant_applications.grant_id", "=", "grants.id")
    .where({ "grants.user_id": grantorID })
    .select(
      "grants.id",
      "grant_title",
      "grants.user_id",
      "grant_applications.worthy_because",
      "grant_applications.spending_plans",
      "grant_applications.mission_statement",
      "grant_applications.created_at",
      "grant_applications.status"
    );
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

// below is to check that status keys are there
function getStatuses() {
  return db("application_status");
}
