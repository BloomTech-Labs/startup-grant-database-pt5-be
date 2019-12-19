// exports.up = function(knex) {
//     return knex.schema.createTable('category_user', table => {
//                 table.increments('id'),
//                 table.integer('user_id').notNullable().references('id').inTable('users')
//                 table.integer('category_id').notNullable().references('id').inTable('category_keys')
//                     .onUpdate('CASCADE')
//                     .onDelete('RESTRICT')
//             })
//             //ELIGIBILITY BY USERS
//             .createTable('eligibility_user', table => {
//                 table.increments('id'),
//                 table.integer('user_id').notNullable().references('id').inTable('users')
//                 table.integer('eligibility_id').notNullable().references('id').inTable('elegibility')
//                     .onUpdate('CASCADE')
//                     .onDelete('RESTRICT')
//             })
// };

// exports.down = function(knex) {
//   return knex.schema
//     .dropTableIfExists("category_user")
//     .dropTableIfExists("eligibility_user");
// };
