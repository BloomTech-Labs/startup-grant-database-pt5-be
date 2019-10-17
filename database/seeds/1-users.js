
const faker = require('faker');

//FUNCTION TO GENERATE USERS
function addUsers() {
     return {
      user_type: Math.round(Math.random()),
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
  
      const batch_users = [];

      for (let i = 0; i < 100; i++) {
        batch_users.push(addUsers())
      }
      
      return knex('users').insert(batch_users);
    };
