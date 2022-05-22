/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'spacious',
      user: 'postgres',
      password: '^admin123%',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:  __dirname + '/db/migrations',
    },
    seeds: {
      directory:  __dirname + '/db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory:  __dirname + '/db/seeds',
    },
  }
};
