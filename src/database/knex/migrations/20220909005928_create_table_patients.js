/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patients', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('cpf', 11).notNullable();
    table.string('email', 60).notNullable();
    table.string('password', 255).notNullable();
    table.string('phone', 30);
    table.double('height');
    table.double('weight');
    table.enu('gender', ['male', 'female', 'other']);
    table.string('pictureUrl', 1000);
    table.date('birthDate');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('patients');
};