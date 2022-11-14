/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('exams', (table) => {
    table.increments('id');

    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.enu('examType', ['sangue', 'urina', 'ultrassom']);
    table.string('location', 500);
    table.string('summary', 1000);
    table.timestamp('date');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('exams');
};
