require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
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
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },
};
