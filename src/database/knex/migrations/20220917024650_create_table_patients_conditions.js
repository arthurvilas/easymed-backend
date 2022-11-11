/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patients_conditions', (table) => {
    table.increments('id');

    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.integer('idCondition').unsigned().notNullable();
    table.foreign('idCondition').references('id').inTable('conditions');

    table.integer('idDiagnosis').unsigned()
    table.foreign('idDiagnosis').references('id').inTable('diagnoses');

    table.boolean('isActive');
    table.boolean('isInFamily');
    table.string('symptoms', 500);
    table.date('startedAt');
    table.date('stoppedAt');
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('patients_conditions');
};
