exports.up = function(knex) {
  //USER TABLE
  return (
    knex.schema
      .createTable('users', table => {
        table.increments('id'),
          table.string('user_type', 2),
          table
            .string('email', 100)
            .notNullable()
            .unique(),
          table
            .string('uid', 100)
            .notNullable()
            .unique(),
          table.string('first_name', 100),
          table.string('last_name', 100),
          table.string('telephone'),
          table.string('department', 100),
          table.string('organization_name', 100),
          table.string('address_one', 100),
          table.string('address_two', 100),
          table.string('zip_code', 11),
          table.timestamp('created_at').notNullable();
      }) //ALERTS TYPE TABLE
      //-----------------------------------------------------------------------------------------------
      .createTable('alerts_type', table => {
        table.increments('id'),
          table.string('alert_type_name', 100),
          table.string('alert_type_description', 255);
      }) //ALERTS TABLE

      .createTable('alerts', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT'),
          table.timestamp('alert_date').notNullable(),
          table
            .integer('alerts_type_id')
            .notNullable()
            .references('id')
            .inTable('alerts_type')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
      })
      //-----------------------------------------------------------------------------------------------
      //GRANTS TABLE
      .createTable('grants', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table.string('grant_title', 100).notNullable(),
          table.string('grant_number').notNullable(),
          table.integer('grant_status').notNullable(),
          table.text('grant_description', 'longtext'),
          table.decimal('grant_amount', 14, 2),
          table.binary('grant_documents'),
          table.timestamp('due_date'),
          table.timestamp('created_at').notNullable(),
          table.string('grant_type', 50).notNullable();
      })
      //-----------------------------------------------------------------------------------------------
      //GRANTS MODIFICATION HISTORY
      .createTable('grants_modification_history', table => {
        table.increments('id'),
          table
            .integer('grant_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT'),
          table.timestamp('updated_at').notNullable(),
          table.string('modification_description', 255);
      })
      //-----------------------------------------------------------------------------------------------
      //CATEGORY KEYS TABLE
      .createTable('category_keys', table => {
        table.increments('id'),
          table
            .string('category_name', 100)
            .notNullable()
            .unique(),
          table.string('category_description');
      })
      //CATEGORY_GRANTS
      // INTERMEDIARY TABLE FOR NORMALIZED DATA
      .createTable('category_grants', table => {
        table.increments('id'),
          table
            .integer('grants_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table
            .integer('category_id')
            .notNullable()
            .references('id')
            .inTable('category_keys')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
      })
      //-----------------------------------------------------------------------------------------------
      //ELEGIBILITY TABLE
      .createTable('elegibility', table => {
        table.increments('id'),
          table
            .string('elegibility_name', 100)
            .notNullable()
            .unique(),
          table.string('elegibility_description', 255);
      })
      //ELIGIBILITY BY GRANTS TABLE
      .createTable('elegibility_grants', table => {
        table.increments('id'),
          table
            .integer('grants_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table
            .integer('elegibility_id')
            .notNullable()
            .references('id')
            .inTable('elegibility')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
      })
      //-----------------------------------------------------------------------------------------------
      //SAVED GRANTS
      .createTable('saved_grants', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT'),
          table
            .integer('grant_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
      })
      // STATUS NEEDS TO GO UP FIRST WHEN MIGRATING
      .createTable('application_status', table => {
        table.increments('id'),
          table
            .string('status_name', 15)
            .notNullable()
            .unique();
      })
      //----------------------------------------------------------------------------------------------
      //GRANTS APPLICATION TABLE
      .createTable('grant_applications', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table
            .integer('grant_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          // CHANGES TO SCHEMA FOR APPLICATION FUNCTIONALITY 12/18
          // ONUPDATE AND ONDELETE TO BE ADDED IN RELEASE CANVAS 3
          table.string('worthy_because', 500).notNullable(),
          table.string('spending_plans', 500).notNullable(),
          table.string('mission_statement', 500).notNullable(),
          table.timestamp('created_at').notNullable(),
          table
            .integer('status', 1)
            .notNullable()
            .references('id')
            .inTable('application_status');
        // BELOW IS STRETCH OR 1.2
        // table.binary("application_documents");
      })
      //----------------------------------------------------------------------------------------------

      // STATUS HISTORY
      .createTable('status_history', table => {
        table.increments('id'),
          table
            .integer('grants_id')
            .notNullable()
            .references('id')
            .inTable('grant_applications')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        table
          .integer('status_id')
          .notNullable()
          .references('id')
          .inTable('application_status')
          .onUpdate('CASCADE')
          .onDelete('RESTRICT'),
          table.timestamp('created_at').notNullable();
      })
      //----------------------------------------------------------------------------------------------
      //STATES TABLE
      .createTable('states', table => {
        table.increments('id'),
          table
            .string('state_name', 50)
            .unique()
            .notNullable();
      })
      //CITY TABLE. THIS MIGHT BE IMPLEMENTED IN THE FUTURE
      .createTable('cities', table => {
        table.increments('id'),
          table
            .integer('state_id')
            .notNullable()
            .references('id')
            .inTable('states')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table.string('city_name', 100).notNullable();
      })
      //COUNTIES TABLE
      .createTable('counties', table => {
        table.increments('id'),
          table
            .integer('state_id')
            .notNullable()
            .references('id')
            .inTable('states')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT'),
          table.string('county_name', 100).notNullable();
      })
      .createTable('regions', table => {
        table.increments('id'),
          table
            .integer('grant_id')
            .notNullable()
            .references('id')
            .inTable('grants')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE'),
          table
            .boolean('country_wide')
            .notNullable()
            .defaultTo('false');
        table
          .integer('state_id')
          .references('id')
          .inTable('states')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE'),
          //   table.integer('city_id').notNullable().references('id').inTable('cities')
          //        .onDelete('RESTRICT')
          //        .onUpdate('CASCADE'),
          table
            .integer('county_id')
            .references('id')
            .inTable('counties')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
      })
      // CATEGORIES BY USERS INTERMEDIARY TABLE
      .createTable('category_user', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users');
        table
          .integer('category_id')
          .notNullable()
          .references('id')
          .inTable('category_keys')
          .onUpdate('CASCADE')
          .onDelete('RESTRICT');
      })
      // ELIGIBILITY BY USERS
      .createTable('eligibility_user', table => {
        table.increments('id'),
          table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users');
        table
          .integer('eligibility_id')
          .notNullable()
          .references('id')
          .inTable('elegibility')
          .onUpdate('CASCADE')
          .onDelete('RESTRICT');
      })
  );
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('status_history')
    .dropTableIfExists('grant_applications')
    .dropTableIfExists('application_status')
    .dropTableIfExists('saved_grants')
    .dropTableIfExists('elegibility_grants')
    .dropTableIfExists('eligibility_user')
    .dropTableIfExists('elegibility')
    .dropTableIfExists('category_user')
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
    .dropTableIfExists('users');
};
