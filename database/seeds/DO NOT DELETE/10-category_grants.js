exports.seed = function(knex) {
          return knex('category_grants').insert([
            {grants_id: 1, category_id:1},
           
            {grants_id: 2, category_id:4},
            
            {grants_id: 3, category_id:5},
            
            {grants_id: 4, category_id:6},
            
            {grants_id: 5, category_id:1},
           
            {grants_id: 6, category_id:5},
           
            {grants_id: 7, category_id:3},
            
            {grants_id: 8, category_id:6},
            
            {grants_id: 9, category_id:3},
            
            {grants_id: 10, category_id:8},
            
            {grants_id: 11, category_id:5},
            
            {grants_id: 12, category_id:1},
           
            {grants_id: 13, category_id:5},
            
            {grants_id: 14, category_id:3},
            
            {grants_id: 15, category_id:1},
            
          ]);
};