const db = require('../../database/DbConfig');

module.exports = {
  find,
  masterSearch
};

// Function to obtain all grants
function find() {
  return db('grants');
}

//Function to obtain all grants by different parameters
function masterSearch(
  state = 2,
  counties = '',
  amaount = '',
  elegibility = '',
  categories = ''
) {
  return db('grants as g')
    .innerJoin('users AS u', 'g.user_id', 'u.id')
    .innerJoin('regions AS r', 'g.id', 'r.grant_id')
    .leftJoin('states AS s', 'r.state_id', '=', 's.id')
    .leftJoin('counties AS c', 'r.county_id', 'c.id')
    .innerJoin('elegibility_grants AS eg', 'g.id', 'eg.grants_id')
    .innerJoin('elegibility AS e', 'e.id', 'eg.elegibility_id')
    .innerJoin('category_grants AS cg', 'g.id', 'cg.grants_id')
    .innerJoin('category_keys AS ck', 'ck.id', 'cg.category_id')
    .leftJoin('grants_modification_history AS gm', 'gm.grant_id', 'g.id')
    .select(
      'g.id',
      'g.grant_title',
      'g.grant_number',
      'g.grant_status',
      'g.grant_description',
      'g.grant_amount',
      'g.due_date',
      'u.first_name',
      'u.last_name',
      'u.email',
      'u.telephone',
      'u.department',
      'u.organization_name',
      'u.address_one',
      'u.address_two',
      'u.zip_code',
      db.raw('array_agg(DISTINCT s.state_name) as states'),
      db.raw('array_agg(DISTINCT e.elegibility_name) as elegibilities'),
      db.raw('array_agg(DISTINCT ck.category_name) as categories'),
      db.raw('array_agg(DISTINCT gm.modification_description) as history') //json_agg(to_chart(gm.updated_at, "MM:DD:YYYY"))
    )
    .groupBy(
      'g.id',
      'u.first_name',
      'u.last_name',
      'u.email',
      'u.telephone',
      'u.department',
      'u.organization_name',
      'u.address_one',
      'u.address_two',
      'u.zip_code'
    )
    .orderBy('g.id');
  // .where('R.state_id', '=',  state)
}
