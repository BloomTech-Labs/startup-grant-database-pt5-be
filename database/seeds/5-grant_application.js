const faker = require('faker');
exports.seed = function(knex) {
         return knex('grant_applications').insert([
          {
            user_id: 1,
            grant_id: 2,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 1
          },
          {
            user_id: 3,
            grant_id: 2,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 2
          },
          {
            user_id: 5,
            grant_id: 2,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 3
          },
          {
            user_id: 7,
            grant_id: 6,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 1
          },
          {
            user_id: 9,
            grant_id: 6,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 3
          },
          {
            user_id: 11,
            grant_id: 9,
            worthy_because: 'reyer',
            spending_plans: 'yretye',
            mission_statement: 'hrthrh',
            created_at: faker.date.recent(),
            status: 2
          }
         ]);
};
