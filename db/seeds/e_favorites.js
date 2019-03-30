exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('favorites').del(),
    knex.raw("ALTER SEQUENCE favorites_id_seq RESTART WITH 1"),
    knex('contributors').then(function () {
      return Promise.all([
        knex('favorites').insert({list_id: 1, user_id: 3}),
        knex('favorites').insert({list_id: 1, user_id: 4}),
        knex('favorites').insert({list_id: 2, user_id: 5}),
      ])
    }),
  ])
};
