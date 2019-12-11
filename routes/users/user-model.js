const DB = require('../../database/DbConfig');

module.exports = {
  find,
  findById,
  findByUserType,
  findByEmail,
  add,
  remove,
  updateUser,
  findCat,
  addCat,
  removeCat,
  findEli,
  addEli,
  removeEli
};

//Get all users
function find() {
  return DB('users');
}

function findById(userId) {
  return DB('users').where({ id: userId });
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
    .select('id', 'user_type');
}

//Create a new user and return the id
function add(userInfo) {
  return DB('users')
    .returning('*')
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

//====================CAT===================================//
//Get all users cat
function findCat() {
  return DB('category_user');
}

//Post new category
function addCat(data) {
  return DB('category_user')
    .returning('id')
    .insert(data);
}

//Delete user cat
function removeCat(userId) {
  return DB('category_user')
    .where({ user_id: userId })
    .del();
}
//=====================Eli==================================//
//Get all users eli
function findEli() {
  return DB('eligibility_user');
}

//Post new elegibility
function addEli(data) {
  return DB('eligibility_user')
    .returning('id')
    .insert(data);
}

//Delete user cat
function removeEli(userId) {
  return DB('eligibility_user')
    .where({ user_id: userId })
    .del();
}
//=======================================================//
