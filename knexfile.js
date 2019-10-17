
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:'localhost',
      user:'postgres',
      database: 'grants',
      user:'postgres',
      password:'ert39883988'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    client: process.env.DB_STAGING_CLIENT,
    connection: {
      host: process.env.DB_STAGING_HOST,
      database: 'd6c3e15jegg184',
      user:     process.env.DB_STAGING_USER,
      password: process.env.DB_STAGING_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: process.env.DB_PRODUCTION_CLIENT,
    connection: {
      host: process.env.DB_PRODUCTION_HOST,
      database: 'dad7aiuhqookm7',
      user:     process.env.DB_PRODUCTION_USER,
      password: process.env.DB_PRODUCTION_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};
