const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    ignoreTables: ['knex_migrations' , 'knex_migrations_lock' , 'users' , 'grants' , 'grants_modification_history' , 
                   'category_keys' , 'elegibility' , 'saved_grants' , 'grant_applications' , 'application_status' , 
                   'application_status' , 'states' , 'counties' , 'category_grants' , 'elegibility_grants'], 
  });
};