const knex = require("knex");
require("dotenv").config();

const config = require("../knexfile.js");

const dbEnv = process.env.DB_ENV || "development";
console.log(dbEnv);
module.exports = knex(config[dbEnv]);
