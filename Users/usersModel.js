const DB = require('../database/DbConfig');

module.exports = {
  find,
  findByEmail,
  add
};

//Get all the current users
function find() {
  return DB('users');
}

//Find User by email and return id
function findByEmail(userEmail) {
  return DB('users')
    .where({ email: userEmail })
    .select('id');
}

//Create a new user and return the id
function add(userInfo) {
  return DB('users')
    .returning('id')
    .insert(userInfo);
}
