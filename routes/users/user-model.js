const db = require("../../database/DbConfig");

module.exports = {
  find,
  findByUserType

  
};

function find() {
  return db("users");
}

//FUNCTION TO GET ALL USERS BY TYPE
//TYPE 0 => Granters
//TYPE 1 => Applicants
function findByUserType(type) {
  return db('users').where({user_type: type})
}
