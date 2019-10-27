exports.up = function(knex) {
        //USER TABLE
        return knex.schema.createTable('users', table =>{
            table.increments('id'),
            table.string('user_type', 2),
            table.string('email', 100).notNullable().unique(),
            table.string('uid', 100).notNullable().unique(),
            table.string('first_name', 100),
            table.string('last_name', 100),
            table.string('telephone'),
            table.string('department', 100),
            table.string('organization_name', 100),
            table.string('address_one', 100),
            table.string('address_two', 100),
            table.string('zip_code', 11),
            table.timestamp('created_at').notNullable();
        })
        //-----------------------------------------------------------------------------------------------
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
        //GRANTS TABLE
        .createTable('grants', table => {
            table.increments('id'),
            table.integer('user_id').notNullable().references('id').inTable('users')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.string('grant_title', 100).notNullable(),
            table.string('grant_number').notNullable(),
            table.integer('grant_status').notNullable(),
            table.text('grant_description', 'longtext'),
            table.decimal('grant_amount', 14,2),
            table.binary('grant_documents'),
            table.timestamp('due_date'),
            table.timestamp('created_at').notNullable(),
            table.string('grant_type',50).notNullable()
        })
        //-----------------------------------------------------------------------------------------------
        //GRANTS MODIFICATION HISTORY
        .createTable('grants_modification_history', table => {
            table.increments('id'),
            table.integer('grant_id').notNullable().references('id').inTable('grants')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT'),
            table.timestamp('updated_at').notNullable(),
            table.string('modification_description', 255)     
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
        .createTable('elegibility', table => {
            table.increments('id'),
            table.string('elegibility_name', 100).notNullable().unique(),
            table.string('elegibility_description', 255)
        })
        //ELIGIBILITY BY GRANTS TABLE
        .createTable('elegibility_grants', table =>{
            table.increments('id'),
            table.integer('elegibility_id').notNullable().references('id').inTable('elegibility')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')
        })
        //-----------------------------------------------------------------------------------------------
        //SAVED GRANTS
        .createTable('saved_grants', table =>{
            table.increments('id'),
            table.integer('user_id').notNullable().references('id').inTable('users')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT'),
            table.integer('grant_id').notNullable().references('id').inTable('grants')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')                
         })
         //----------------------------------------------------------------------------------------------
        //GRANTS APPLICATION TABLE.
        .createTable('grant_applications', table => {
            table.increments('id'),
            table.integer('user_id').notNullable().references('id').inTable('users')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.integer('grant_id').notNullable().references('id').inTable('grants')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.timestamp('created_at').notNullable(),
            table.binary('application_documents')
        })
        //----------------------------------------------------------------------------------------------
        //APPLICATION STATUS TABLE.
        .createTable('application_status', table => {
            table.increments('id'),
            table.string('status_name', 100).notNullable().unique(),
            table.string('status_description', 255)
        })
        //STATUS HISTORY
        .createTable('status_history', table => {
            table.increments('id'),
            table.integer('grants_id').notNullable().references('id').inTable('grant_applications')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT')
            table.integer('status_id').notNullable().references('id').inTable('application_status')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT'),
            table.timestamp('created_at').notNullable()          
        })
        //----------------------------------------------------------------------------------------------
        //STATES TABLE
        .createTable('states', table => {
            table.increments('id'),
            table.string('state_name', 50).unique().notNullable()
        })
        //CITY TABLE
        .createTable('cities', table => {
            table.increments('id'),
            table.integer('state_id').notNullable().references('id').inTable('states')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.string('city_name', 100).notNullable()
        })
        //COUNTIES TABLE
        .createTable('counties', table => {
            table.increments('id'),
            table.integer('city_id').notNullable().references('id').inTable('cities')
                 .onUpdate('CASCADE')
                 .onDelete('RESTRICT'),
            table.string('county_name', 100).notNullable()     
        })
        .createTable('regions', table => {
            table.increments('id'),
            table.integer('grant_id').notNullable().references('id').inTable('grants')
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.integer('state_id').notNullable().references('id').inTable('states')   
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),                      
            table.integer('city_id').notNullable().references('id').inTable('cities')   
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE'),
            table.integer('county_id').notNullable().references('id').inTable('counties')   
                 .onDelete('RESTRICT')
                 .onUpdate('CASCADE')        
        })
      };
      
    exports.down = function(knex) {
            return knex.schema.dropTableIfExists('status_history')
                              .dropTableIfExists('application_status')
                              .dropTableIfExists('grant_applications')
                              .dropTableIfExists('saved_grants')
                              .dropTableIfExists('elegibility_grants')
                              .dropTableIfExists('elegibility')
                              .dropTableIfExists('category_grants')
                              .dropTableIfExists('category_keys')
                              .dropTableIfExists('grants_modification_history')
                              .dropTableIfExists('regions') 
                              .dropTableIfExists('counties') 
                              .dropTableIfExists('cities') 
                              .dropTableIfExists('states')
                              .dropTableIfExists('grants')  
                              .dropTableIfExists('alerts')   
                              .dropTableIfExists('alerts_type')
                              .dropTableIfExists('users') 
                                                         
          };
