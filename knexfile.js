require('dotenv').config();
const path = require('path');

/**
 * @type { Object.<string, import('knex').Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'easymed',
      user: 'easymeduser',
      password: process.env.MYSQL_PASSWORD,
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      ),
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      ),
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },
};
