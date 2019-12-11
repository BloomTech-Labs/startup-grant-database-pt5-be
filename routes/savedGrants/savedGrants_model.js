const DB = require('../../database/DbConfig');

module.exports = {
  find,
  findById,
  add,
  remove
};

// Get all saved grants
function find() {
  return DB('saved_grants')
    .join('grants', 'saved_grants.grant_id', '=', 'grants.id')
    .select('grants.id', 'grant_title', 'grants.user_id');
}

// Get all saved grants for specific user
function findById(id) {
  return DB('saved_grants')
    .join('grants', 'saved_grants.grant_id', '=', 'grants.id')
    .where({ 'saved_grants.user_id': id })
    .select('*');
}

// Function for user to save grants for dashboard
function add(myGrants) {
  return DB('saved_grants')
    .returning('id')
    .insert(myGrants);
}

// Function for user to delete saved grants
function remove(savedID) {
  return DB('saved_grants')
    .where({ id: savedID })
    .del();
}
