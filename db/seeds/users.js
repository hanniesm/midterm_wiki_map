exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"),
    knex("users").then(function() {
      return Promise.all([
        knex("users").insert({ name: "Alice" }),
        knex("users").insert({ name: "Bob" }),
        knex("users").insert({ name: "Charlie" })
      ]);
    })
  ]);
};
