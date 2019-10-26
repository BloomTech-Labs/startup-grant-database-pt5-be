const db = require('../DbConfig.js');

module.exports = {
    find
}

function find() {
    return db('states');
}