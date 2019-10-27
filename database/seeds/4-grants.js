const db = require('../../routes/users/user-model.js');
const faker = require('faker');

const userType = 0;

function getGranters (type) {
  return new Promise(function(resolve , reject) {
    resolve(db.findByUserType(type))
  })
}

//FUNCTION TO CREATE THE GRANTS TO BE INSERTED IN TABLE
function grantObjectCreator(user) {
  return {
    user_id: user,
    grant_title: "Grant Tittle goes here",
    grant_number: faker.random.alphaNumeric(),
    grant_status: Math.round(Math.random()),
    grant_description: faker.lorem.paragraph(),
    grant_amount: faker.finance.amount(),
    due_date: faker.date.future(),
    created_at: faker.date.recent(),
    grant_type: " "
  }
}

exports.seed = function(knex) {
  
      return getGranters(userType).then(function(users) {
        const grant_batch = [];
        for (let i=0; i< Object.keys(users).length ; i++) {
          grant_batch.push(grantObjectCreator(users[i]['id']));
        }
        return grant_batch
      }).then(function(final_object) {
        console.log(final_object)
         return knex('grants').insert(final_object);
      }) 
};
