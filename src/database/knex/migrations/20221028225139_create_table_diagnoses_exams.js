/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('diagnoses_exams', table => {
    table.integer('idDiagnosis').unsigned().notNullable();
    table.foreign('idDiagnosis').references('id').inTable('diagnoses');

    table.integer('idExam').unsigned().notNullable();
    table.foreign('idExam').references('id').inTable('exams');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('diagnoses_exams');
};
