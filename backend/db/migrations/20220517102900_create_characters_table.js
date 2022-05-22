/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('characters', function(table) {
    table.increments('id').primary().unique();
    table.string('planet').index().references('code').inTable('planets');
    table.string('name').checkLength('<=', 15).checkLength('>=', 1).notNullable();
    table.text('description').checkLength('<=', 300).checkLength('>=', 10);
    table.text('picture_url');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('characters');
};
