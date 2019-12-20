require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      database: "grants",
      user: "postgres",
      password: "ert39883988"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  staging: {
    // client: process.env.DB_STAGING_CLIENT,

    client: "pg",
    connection: {
      host: process.env.DB_STAGING_HOST,
      database: process.env.DB_STAGING,
      user: process.env.DB_STAGING_USER,
      password: process.env.DB_STAGING_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_PRODUCTION_HOST,
      database: "dad7aiuhqookm7",
      user: process.env.DB_PRODUCTION_USER,
      password: process.env.DB_PRODUCTION_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  testing: {
    client: "pg",
    connection: {
      host: "ec2-174-129-252-255.compute-1.amazonaws.com",
      database: "devhmhuq6b15ch",
      user: "kmzzotiiduedrv",
      password:
        "4d786fe178ad7a77e8f2f93c417c470dc185932ea8fc9075650494052aff53c4",
      ssl: {
        rejectUnauthorized: false
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
