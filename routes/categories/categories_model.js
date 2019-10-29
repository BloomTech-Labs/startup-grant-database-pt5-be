const db = require('../../database/DbConfig');

module.exports = {
    find
}

function find() {
    return db('category_keys');
}