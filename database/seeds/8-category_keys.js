
exports.seed = function(knex) {
      return knex('category_keys').insert([
        {id: 1, category_name: 'hipanic or latino', category_description: ""},
        {id: 2, category_name: 'african american', category_description: ""},
        {id: 3, category_name: 'women or non-binary', category_description: ""},
        {id: 4, category_name: 'native american', category_description: ""},
        {id: 5, category_name: 'lgbtq', category_description: ""},
        {id: 6, category_name: 'asian', category_description: ""},
        {id: 7, category_name: 'veteran', category_description: ""},
        {id: 8, category_name: 'hawaiian and pacific islander', category_description: ""},
        {id: 9, category_name: 'student', category_description: ""},
      ]);
};
