/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('patients_conditions', (table) => {
    // TODO create index to store repeated conditions
    table.integer('idPatient').unsigned().notNullable();
    table.foreign('idPatient').references('id').inTable('patients');

    table.integer('idCondition').unsigned().notNullable();
    table.foreign('idCondition').references('id').inTable('conditions');

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