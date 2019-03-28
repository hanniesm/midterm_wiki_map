
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function (table) {
      table.increments();
      table
        .integer('list_id')
        .unsigned()
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable();
      table
        .foreign("list_id")
        .references("id")
        .inTable("lists")
        .onDelete('CASCADE');
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favorites')
  ])
};
