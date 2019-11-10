const db = require('../../routes/grants/grants_applications.js');
const faker = require('faker');

//FUNCTION TO OBTAIN ALL GRANT APPLICATIONS
function getGrantApplications() {
  return new Promise(function(resolve , reject) {
    resolve(db.find());
  })
}

async function 

//FUNCTION TO CREATE INDIVIDUAL RECORDS
function createHistory (grant_application_id) {
  return {
    grants_id: grant_application_id,
    status_id: 1,
    created_at: faker.date.recent()
  }
}

exports.seed = function(knex) {
      return getGrantApplications().then(function(applicationObject) {
        var final_Batch = [];
        for (let i = 0 ; i < Object.keys(applicationObject).length ; i++) {
           final_Batch.push(createHistory(applicationObject[i]['id']))
        };
        return final_Batch;
      }).then(function(final_Batch) {
          return knex('status_history').insert(final_Batch);
    });
};

