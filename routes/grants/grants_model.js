const db = require('../../database/DbConfig');

module.exports = {
  find,
  findById,
  findPinnedGrants,
  masterSearch,
  add,
  updateGrant,
  lastModify,
  getLastModify
};

// Function to obtain all grants
function find() {
  return db('grants');
}

// Function to obtain all saved grants for a specific user
function findPinnedGrants(recipientUserId) {
  return db('saved_grants').where({ user_id: recipientUserId });
}

//Get grant by ID
function findById(id) {
  return db('grants').where({ id: id });
}

//==========================================================================
//Update/edit grants
function updateGrant(id, data) {
  return db('grants')
    .where({ id: id })
    .update(data);
}

//Last modify
function lastModify(data) {
  return db('grants_modification_history').insert(data);
}

//Last modify
function getLastModify() {
  return db('grants_modification_history');
}
//==========================================================================

//Function to obtain all grants by different parameters
function masterSearch(
  state = [],
  counties = [],
  minAmount = '',
  maxAmount = '',
  eligibility = [],
  category = []
) {
  if (
    state.length === 0 &&
    counties.length === 0 &&
    eligibility.length === 0 &&
    category.length === 0
  ) {
    state = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ];
  }
  // console.log(
  //   "inside mastersearch function",
  //   state,
  //   eligibility,
  //   category,
  //   minAmount,
  //   maxAmount
  // );

  return (
    db('grants as g')
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
      .whereIn('s.id', state)
      .orWhereIn('cg.grants_id', category)
      .orWhereIn('eg.grants_id', eligibility)
      // .andWhere("g.grant_amount", ">", minAmount)
      // .andWhere("g.grant_amount", "<", maxAmount)
      .orderBy('g.id')
  );
}

// function to add a new grant 
function add(grantInfo) {
  return db('grants')
    .returning('*')
    .insert(grantInfo);
}
