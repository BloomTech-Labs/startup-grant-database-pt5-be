
exports.seed = function(knex) {
      return knex('application_status').insert([
        {id: 1, status_name: 'Submitted'},
        {id: 2, status_name: 'Pending Review'},
        {id: 3, status_name: 'Denied'},
        {id: 4, status_name: 'Reviewed'},
      ]);
};
