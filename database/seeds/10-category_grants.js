const dbGrants = require('../../routes/grants/grants_model.js');
const dbCategoryKeys = require('../../routes/categories/categories_model.js');

//FUNCTION TO OBTAIN ALL GRANTS
function getGrants() {
  return new Promise(function(resolve , reject) {
    resolve(dbGrants.find()); //
  })
}

//FUNCTION TO OBTAIN ALL CATEGORY KEYS
function getCategoryKeys() {
  return new Promise(function(resolve , reject) {
    resolve(dbCategoryKeys.find()); //
  })
}

//FUNCTION TO CREATE INDIVIDUAL RECORDS
function categoryPerGrant (grant__id , category_id) {
  return {
    grants_id: grant__id,
    category_id: category_id
  }
}

exports.seed = function(knex) {
      return Promise.all([getGrants(),getCategoryKeys()]).then(function(categoryGrantObject) {
        var final_Batch = [];
        console.log(categoryGrantObject[0], categoryGrantObject[1])
        for (let i = 0 ; i < Object.keys(categoryGrantObject[0]).length ; i++) {
          for (const items of categoryGrantObject[1]) {
            final_Batch.push(categoryPerGrant(categoryGrantObject[0][i]['id'], items.id));
          }
        };
        return final_Batch;
      }).then(function(final_Batch) {
          return knex('category_grants').insert(final_Batch);
    });
};