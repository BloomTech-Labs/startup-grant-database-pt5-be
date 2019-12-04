const dbGrants = require('../../routes/grants/grants_model.js');
const dbEligibility = require('../../routes/elegibility/elegibility_model.js')

//FUNCTION TO OBTAIN ALL GRANTS
function getGrants() {
  return new Promise(function(resolve , reject) {
    resolve(dbGrants.find()); //
  })
}

//FUNCTION TO OBTAIN ALL CATEGORY KEYS
function getElegibilities() {
  return new Promise(function(resolve , reject) {
    resolve(dbEligibility.find()); //
  })
}

//FUNCTION TO CREATE INDIVIDUAL RECORDS
function categoryPerGrant (grant__id , elegibility_id) {
  return {
    grants_id: grant__id,
    elegibility_id: elegibility_id
  }
}

exports.seed = function(knex) {
      return Promise.all([getGrants(),getElegibilities()]).then(function(eligibilityGrantObject) {
        var final_Batch = [];
        console.log(eligibilityGrantObject[0], eligibilityGrantObject[1])
        for (let i = 0 ; i < Object.keys(eligibilityGrantObject[0]).length ; i++) {
          for (const items of eligibilityGrantObject[1]) {
            final_Batch.push(categoryPerGrant(eligibilityGrantObject[0][i]['id'], items.id));
          }
        };
        return final_Batch;
      }).then(function(final_Batch) {
        console.log(final_Batch)
          return knex('elegibility_grants').insert(final_Batch);
    });
};