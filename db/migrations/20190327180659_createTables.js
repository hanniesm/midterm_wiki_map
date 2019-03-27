

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('lists', function (table) {
      table.increments();
      table.string('title');
      table.string('description');
      table.timestamps(true, true);
      table
        .integer('created_by_id')
        .unsigned()
        .notNullable();
      table
        .foreign("created_by_id")
        .references("id")
        .inTable("users")
        .onDelete('CASCADE');
    }),
    knex.schema.createTable('pinpoints', function(table) {
      table.increments();
      table
        .integer('list_id')
        .unsigned()
        .notNullable();
      table.string('title');
      table.string('description');
      table.string('image');
      table.timestamps(true, true);
      table.float('latitude');
      table.float('longitude')
      table
        .foreign("list_id")
        .references("id")
        .inTable("lists")
        .onDelete('CASCADE');
    }),
    knex.schema.createTable('contributors', function(table) {
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
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pinpoints'),
    knex.schema.dropTable('contributors'),
    knex.schema.dropTable('lists')
  ])
};
