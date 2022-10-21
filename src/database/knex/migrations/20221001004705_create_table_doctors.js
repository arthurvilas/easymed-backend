/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('doctors', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 60).notNullable();
    table.string('password', 255).notNullable();
    table.string('crm', 20).notNullable();
    table.string('pictureUrl', 1000);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('doctors');
};
