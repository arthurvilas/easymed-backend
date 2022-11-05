/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('diagnoses', (table) => {
    table.increments('id');

    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.integer('idDoctor').unsigned().notNullable();
    table.foreign('idDoctor').references('id').inTable('doctors');

    table.integer('idPatientCondition').unsigned().notNullable();
    table
      .foreign('idPatientCondition')
      .references('id')
      .inTable('patients_conditions');

    table.string('description', 5000);
    table.string('diagnosisUrl', 2000).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('diagnoses');
};
