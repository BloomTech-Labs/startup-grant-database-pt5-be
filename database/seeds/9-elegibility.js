
exports.seed = function(knex) {
  
      return knex('elegibility').insert([
        {id: 1, elegibility_name: 'social mission', elegibility_description: ""},
        {id: 2, elegibility_name: 'agriculture and biotech', elegibility_description: ""},
        {id: 3, elegibility_name: 'entertainment', elegibility_description: ""},
        {id: 4, elegibility_name: 'financial services', elegibility_description: ""},
        {id: 5, elegibility_name: 'food and drink', elegibility_description: ""},
        {id: 6, elegibility_name: 'hardware', elegibility_description: ""}
      ]);
};
