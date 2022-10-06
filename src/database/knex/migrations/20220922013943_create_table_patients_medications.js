/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patients_medications', (table) => {
    table.increments('id');

    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.integer('idMedication').unsigned().notNullable();
    table.foreign('idMedication').references('id').inTable('medications');

    table.decimal('dosage');
    table.enu('type', ['mg', 'ml']);
    table.string('frequency', 200);
    table.boolean('isActive');
    table.date('startedAt');
    table.date('stoppedAt');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('patients_medications');
};
