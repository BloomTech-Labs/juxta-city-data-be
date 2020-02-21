require('dotenv').config();
const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'findur-db',
      user: 'postgres',
      password: process.env.PASSWORD,
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
