const db = require('../../database/DbConfig');

module.exports = {
    find, 
    masterSearch
}

function find() {
    return db('grants');
};


function masterSearch() {
    return db('grants').innerJoin('regions', 'grants.id' , 'regions.grant_id')
}