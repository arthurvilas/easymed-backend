/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patient', (table) => {
    table.increments('id');
    table.string('email', 60).notNullable();
    table.double('height');
    table.double('weigth');
    table.enu('gender', ['male', 'female', 'other']);
    table.timestamps(true, true, true);
    table.date('birthDate');
    table.string('password', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('patient');
};
