const db = require('../../routes/users/user-model.js');
const dbGrants = require('../../routes/grants/grants_model.js');
const faker = require('faker');

const userType = 1;

//FUNCTION TO RESOLVE THE GRANTERS FROM USER TABLE
function getGranters (type) {
  return new Promise(function(resolve , reject) {
    resolve(db.findByUserType(type))
  })
}

//FUNCTION TO OBTAIN THE GRANTS FROM grant TABLE
function getGrants () {
  return new Promise(function(resolve , reject) {
    resolve(dbGrants.find())
  })
}

//FUNCTION TO CREATE THE APPLICATION TO BE INSERTED IN TABLE
function applicationObjectCreator(user , grant) {
  return {
    user_id: user,
    grant_id: grant,
    created_at: faker.date.recent()
  }
}

exports.seed = function(knex) {
  
      return Promise.all([getGranters(userType) , getGrants()]).then(function(combinedArray) {
        const getGrantIdOnly = combinedArray[1].map(grantItems => {
          return grantItems.id;
        })
        const application_batch = [];
        for (let i=0; i< Object.keys(combinedArray[0]).length ; i++) {
          const randomGrant = getGrantIdOnly[Math.floor(Math.random() * getGrantIdOnly.length)];
          application_batch.push(applicationObjectCreator(combinedArray[0][i]['id'] , randomGrant));
        }
        return application_batch
      }).then(function(final_object) {
         return knex('grant_applications').insert(final_object);
      }) 
};
