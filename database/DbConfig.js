const knex = require("knex");
require("dotenv").config();

const config = require("../knexfile.js");

const dbEnv = "staging"// process.env.DB_ENV || "development";
console.log(dbEnv);
module.exports = knex(config[dbEnv]);
