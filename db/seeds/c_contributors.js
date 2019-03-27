exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('contributors').del(),
    knex.raw("ALTER SEQUENCE contributors_id_seq RESTART WITH 1"),
    knex('contributors').then(function () {
      return Promise.all([
        knex('contributors').insert({list_id: 1, user_id: 3}),
        knex('contributors').insert({list_id: 1, user_id: 4}),
        knex('contributors').insert({list_id: 2, user_id: 5}),
      ])
    }),
  ])
};
