/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('friendship', function(table) {
    table.integer('character_id').references('id').inTable('characters');
    table.integer('friend_id').references('id').inTable('characters');
    table.unique(['character_id', 'friend_id']);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('friendship');
};
