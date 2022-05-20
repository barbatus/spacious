/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('planets', function(table) {
    table.increments('id').primary().unique();
    table.string('name').checkLength('<=', 15).checkLength('>=', 1).notNullable();
    table.text('description').checkLength('<=', 300).checkLength('>=', 15);
    table.string('code').index().unique();
    table.string('picture_url');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('planets');
};

