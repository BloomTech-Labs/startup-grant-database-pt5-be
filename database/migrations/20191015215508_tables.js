
exports.up = function(knex) {
    //USER TABLE
    return knex.schema.createTable('users', table =>{
        table.increments('id'),
        table.string('user_type', 1),
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
    })
    //ALERTS TYPE TABLE
    .createTable('alerts_type', table => {
        table.increments('id'),
        table.string('alert_type_name', 100),
        table.string('alert_type_description', 255)
    })

    //ALERTS TABLE
    .createTable('alers', table => {
        table.increments('id'),
        table.integer('user_id').notNullable().references('id').inTable('users')
             .onUpdate('CASCADE')
             .onDelete('RESTRICT'),
        table.timestamp('alert_date').notNullable(),
        table.integer('alerts_type_id').references('id').inTable('alerts_type')
             .onUpdate('CASCADE')
             .onDelete('RESTRICT')
    })


    //CATEGORY TABLE
    .createTable('categories', table => {
        table.increments('id');
        table.string('category_name').notNullable().unique(),
        table.string('description', 255)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
                      .dropTableIfExists('categories');
  };