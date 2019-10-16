//CATEGORY TABLE
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id');
        table.string('category_name').notNullable().unique(),
        table.string('description', 255)
    })   
    //USER TABLE
    .createTable('users', table =>{
        table.increments('id'),
        table.string('user_type', 1).notNullable(),
        table.string('email').notNullable().unique(),
        table.string('uid').notNullable().unique(),
        table.string('first_name', 50),
        table.string('last_name', 50),
        table.string('telephone'),
        table.string('department', 50),
        table.string('organization_name', 50),
        table.string('address_one', 50),
        table.string('address_two', 50),
        table.string('zip_code', 10),
        table.timestamp('created_at').notNullable();
        table.integer('category_id').references('id').inTable('categories')
    })

  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExist('users')
                      .dropTableIfExist('categories');
  };