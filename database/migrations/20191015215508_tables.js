    exports.up = function(knex) {
        //USER TABLE
        return knex.schema.createTable('users', table =>{
            table.increments('id'),
            table.string('user_type', 1),
            table.string('email').notNullable().unique(),
            table.string('uid').notNullable().unique(),
            table.string('first_name', 50),
            table.string('last_name', 50),
            table.string('telephone'),
            table.string('department', 50),
            table.string('organization_name', 50),
            table.string('address_one', 50),
            table.string('address_two', 50),
            table.string('zip_code', 10),
            table.timestamp('created_at').notNullable();
        })
        //ALERTS TYPE TABLE
        .createTable('alerts_type', table => {
            table.increments('id'),
            table.string('alert_type_name', 100),
            table.string('alert_type_description', 255)
        })
    
        //ALERTS TABLE
        .createTable('alerts', table => {
            table.increments('id'),
            table.integer('user_id').notNullable().references('id').inTable('users')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT'),
            table.timestamp('alert_date').notNullable(),
            table.integer('alerts_type_id').notNullable().references('id').inTable('alerts_type')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')
        })
        //-----------------------------------------------------------------------------------------------
        //CATEGORY KEYS TABLE
        .createTable('category_keys', table => {
            table.increments('id'),
            table.string('category_name', 100).notNullable().unique(),
            table.string('category_description')
        })
        //CATEGORY_GRANTS
        .createTable('category_grants', table => {
            table.increments('id'),
            table.integer('category_id').notNullable().references('id').inTable('category_keys')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE') 
        })
        //-----------------------------------------------------------------------------------------------
        //ELEGIBILITY TABLE
        .createTable('eligibility', table => {
            table.increments('id'),
            table.string('eligibility_name', 100).notNullable().unique(),
            table.string('eligibility_description', 255)
        })
        //ELIGIBILITY BY GRANTS TABLE
        .createTable('eligibility_grants', table =>{
            table.increments('id'),
            table.integer('eligibility_id').notNullable().references('id').inTable('eligibility')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')
        })
        //-----------------------------------------------------------------------------------------------
        //APPLICATION STATUS TABLE.
        .createTable('application_status', table => {
            table.increments('id'),
            table.string('status_name', 100).notNullable().unique(),
            table.string('status_description', 255)
        })
        //STATUS HISTORY
        .createTable('status_history', table => {
            table.increments('id'),
            table.integer('grants_id').notNullable().references('id').inTable('grants')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')
            table.integer('status_id').notNullable().references('id').inTable('application_status')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')     
        })
        //CATEGORY TABLE
        .createTable('categories', table => {
            table.increments('id');
            table.string('category_name').notNullable().unique(),
            table.string('description', 255)
        })
      };
      
    exports.down = function(knex) {
            return knex.schema.dropTableIfExists('alerts')
                              .dropTableIfExists('alerts_type')
                              .dropTableIfExists('users')
                              .dropTableIfExists('category_keys')
                              .dropTableIfExists('category_grants') 
                              .dropTableIfExists('eligibility')
                              .dropTableIfExists('eligibility_grants')  





                              
                              .dropTableIfExists('application_status')
                              .dropTableIfExists('categories')
                              
          };