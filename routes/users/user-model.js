const DB = require('../../database/DbConfig');

module.exports = {
  find,
  findByUserType,
  findByEmail,
  add,
  remove,
  updateUser
};

//Get all users
function find() {
  return DB('users');
}

//FUNCTION TO GET ALL USERS BY TYPE
//TYPE 0 => Granters
//TYPE 1 => Applicants
function findByUserType(type) {
  return DB('users').where({ user_type: type });
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

//Delete user
function remove(userId) {
  return DB('users')
    .where({ id: userId })
    .del();
}

//update user
function updateUser(uid, newInfo) {
  return DB('users')
    .where({ id: uid })
    .update(newInfo);
}
