const db = require('./../../database/DbConfig.js');

module.exports = {
    find,
    findbystate
}

function find() {
    return db('counties');
}

function findbystate(state) {
    console.log(state)
    return db('counties').where({state_id: state});
}

