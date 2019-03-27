exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"),
    knex('users').then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice'}),
        knex('users').insert({name: 'Harry'}),
        knex('users').insert({name: 'Charlie'}),
        knex('users').insert({name: 'Terry'}),
        knex('users').insert({name: 'Neil'}),
        knex('users').insert({name: 'Jane'}),
      ])
    }),
  ])
};
