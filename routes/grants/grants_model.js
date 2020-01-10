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

function masterSearch(state = [],  minAmount=0,  maxAmount=0, eligibility = [], category = []) { //counties = [],
  
   // variable to control if search is combined with State and County 
var stateFilterOnly = false;

//CONVERTING STRING ARRAYS FOR minAmount AND maxAmount TO NUMERIC ARRAYS   
  const minAmountToNumericArray = minAmount // parseFloa(minAmount); 
  const maxAmountToNumericArray =  maxAmount;

  if (state.length === 0 && 
      counties.length === 0 && 
      minAmountToNumericArray === 0 &&
      maxAmountToNumericArray === 0 &&
      eligibility.length === 0 && 
      category.length === 0  || 
      state[0] === 'All States') {

      stateFilterOnly = true;
      
      const myStates = [];
      for (let i=1; i<52; i++) {
        myStates.push(i);
      }
     state = myStates; 
     console.log('My States', state)
  }
  
  return (
    db('grants as g')
      .innerJoin('users AS u', 'g.user_id', 'u.id')
      .innerJoin('regions AS r', 'g.id', 'r.grant_id')
      .leftJoin('states AS s', 'r.state_id', '=', 's.id')
      // .leftJoin('counties AS c', 'r.county_id', 'c.id')
      .innerJoin('elegibility_grants AS eg', 'g.id', 'eg.grants_id')
      .innerJoin('elegibility AS e', 'e.id', 'eg.elegibility_id')
      .innerJoin('category_grants AS cg', 'g.id', 'cg.grants_id')
      .innerJoin('category_keys AS ck', 'ck.id', 'cg.category_id')
      .leftJoin('grants_modification_history AS gm', 'gm.grant_id', 'g.id')
      .select(
        "g.id",
        "g.grant_title",
        "g.grant_number",
        "g.grant_status",
        "g.grant_description",
        "g.grant_amount",
        "g.due_date",
        "u.first_name",
        "u.last_name",
        "u.email",
        "u.telephone",
        "u.department",
        "u.organization_name",
        "u.address_one",
        "u.address_two",
        "u.zip_code",
        db.raw("array_agg(DISTINCT s.state_name) as states"),
        // db.raw("array_agg(DISTINCT c.county_name) as counties"),
        db.raw("array_agg(DISTINCT e.elegibility_name) as elegibilities"),
        db.raw("array_agg(DISTINCT ck.category_name) as categories"),
        db.raw("array_agg(DISTINCT gm.modification_description) as history") //json_agg(to_chart(gm.updated_at, "MM:DD:YYYY"))
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
      .whereIn("s.id", state)
      // .orWhereIn("c.id", counties)
      .orWhereIn("cg.grants_id", category)
      .orWhereIn("eg.grants_id", eligibility)
      // .orWhere(function() {
      //   this.where("g.grant_amount", ">", minAmountToNumericArray).andWhere("g.grant_amount", "<", maxAmountToNumericArray);
      // })
      .orderBy("g.id")
  );
}


// function to add a new grant 
function add(grantInfo) {
  return db('grants')
    .returning('*')
    .insert(grantInfo);
}

