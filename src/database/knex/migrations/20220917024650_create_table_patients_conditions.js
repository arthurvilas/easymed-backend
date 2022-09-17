/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patients_conditions', (table) => {
    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.integer('idCondition').unsigned().notNullable();
    table.foreign('idCondition').references('id').inTable('conditions');

    table.boolean('isActive');
    table.boolean('isInFamily');
    table.string('symptoms', 500);
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropSchemaIfExists('patients_conditions');
};