const db = require('./../../database/DbConfig.js');

module.exports = {
    find,
    findbystate
}

function find() {
    return db('counties');
}

function findbystate(state) {
    return db('counties').where({state});
}

