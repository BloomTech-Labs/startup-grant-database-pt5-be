const DB = require('../../database/DbConfig');

module.exports = {
  find,
  findById,
  add
};

// Get all saved grants
function find() {
  return DB('saved_grants');
}

// Get all saved grants for specific user
function findById(id) {
  return DB('saved_grants')
    .where({ user_id: id })
    .select('grant_id');
}

// Function for user to save grants for dashboard
function add(myGrants) {
  return DB('saved_grants')
    .returning('id')
    .insert(myGrants);
}
