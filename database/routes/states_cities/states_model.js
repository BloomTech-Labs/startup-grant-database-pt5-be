const db = require('../DbConfig.js.js');

module.exports = {
    find
}

function find() {
    return db('states');
}