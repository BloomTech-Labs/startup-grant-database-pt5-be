
const faker = require('faker');

var userType = 0; 

//FUNCTION TO GENERATE USERS
function addUsers(userType) {
     return {
      user_type: userType, //Math.round(Math.random()),
      email: faker.internet.email(),
      uid: faker.random.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      telephone: "", 
      department: faker.commerce.department(),
      organization_name: faker.company.companyName(),
      address_one: faker.address.streetAddress(),
      address_two: "",
      zip_code: faker.address.zipCode(),
      created_at: faker.date.recent()
    }
    
};

exports.seed = function(knex) {
    //Creates 20 users, ten are Grantors and ten are Applicants
    const batch_users = [];
    for (let i = 0; i < 30; i++) {
      let useruserType = i % 2 === 0 ? 1 : 0;
      batch_users.push(addUsers(useruserType))
    }
    return knex('users').insert(batch_users);
    };
