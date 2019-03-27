exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('lists').del(),
    knex.raw("ALTER SEQUENCE lists_id_seq RESTART WITH 1"),
    knex('lists').then(function () {
      return Promise.all([
        knex('lists')
          .insert(
            {title: 'My overseas holiday',
            description: 'Places I want to visit on my next holiday',
            created_by_id: '1'}
          ),
        knex('lists')
          .insert(
            {title: 'I heart Harry Potter',
            description: 'Real life movie locations from Harry Potter',
            created_by_id: '2'}
          )
      ])
    }),
  ])
};
