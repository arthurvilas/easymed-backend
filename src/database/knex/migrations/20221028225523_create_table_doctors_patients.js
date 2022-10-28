/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('doctors_patients', (table) => {
    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');
    table.integer('idDoctor').unsigned().notNullable();
    table.foreign('idDoctor').references('id').inTable('doctors');
    table.boolean('patientConfirmed');
    table.timestamp('authorizedAt');
    table.timestamp('validUntil');
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('doctors_patients');
};
