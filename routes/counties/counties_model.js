const db = require('./../../database/DbConfig.js');

module.exports = {
    find,
    findbystate
}

//Get all Counties
function find() {
    return db('counties');
}

//Get all counties for an specific state
function findbystate(state) {
    return db('counties').whereIn('state_id', state);
}

