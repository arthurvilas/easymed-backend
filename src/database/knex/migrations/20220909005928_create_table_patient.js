/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patient', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('cpf', 11).notNullable();
    table.string('email', 60).notNullable();
    table.string('password', 255).notNullable();
    table.string('phone', 30);
    table.double('height');
    table.double('weigth');
    table.enu('gender', ['male', 'female', 'other']);
    table.date('birthDate');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('patient');
};