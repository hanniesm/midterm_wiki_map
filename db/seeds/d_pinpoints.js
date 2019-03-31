exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE pinpoints_id_seq RESTART WITH 1"),
    knex('pinpoints').then(function () {
      return Promise.all([
        knex('pinpoints')
          .insert(
            {list_id: 1,
            title: 'Stone Henge',
            description: 'Some weird rocks in a kinda circle',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2014/06/27232304/3425200141_7d3f57d3f5_z.jpg',
            latitude: 51.178882,
            longitude: -1.826215}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 1,
            title: 'Machu Picchu',
            description: 'A lot of stairs to climb',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2014/06/02061055/Peru-Machu-Picchu-overhead-620x934.jpg',
            latitude: -13.163136,
            longitude: -72.5471516}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 1,
            title: 'Istanbul',
            description: 'Markets and street food',
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Grand-Bazaar_Shop.jpg',
            latitude: 41.0055005,
            longitude: 28.7319902}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 1,
            title: 'Shakespeares Bookstore',
            description: 'Books and random people playing the piano',
            image: 'https://lh5.googleusercontent.com/p/AF1QipMMMYqUp5FQySw_Fvc21p7A0lCtZIGVU4IGbmIs=w408-h306-k-no',
            latitude: 48.852547,
            longitude: 2.3471197}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 2,
            title: 'Hogwarts',
            description: 'Christ College Oxford became Hogwarts',
            image: 'https://www.experienceoxfordshire.org/wp-content/uploads/2017/02/christ-church-courtyard-1340x477.jpg',
            latitude: 51.750391,
            longitude: -1.247538}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 2,
            title: 'Platform 9 and 3 quarters',
            description: 'Kings Cross Station',
            image: 'https://vignette.wikia.nocookie.net/harrypotter/images/1/12/King%27s_cross_station.jpg/revision/latest?cb=20070908085852',
            latitude: 51.5316509,
            longitude: -0.1244124}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 2,
            title: 'By train',
            description: 'The Glenfiann viaduct where the Hogwarts Express drives',
            image: 'https://www.visitbritainshop.com/world/~/media/images/articles/harry%20potter%20filming%20locations%20guide/glen-finnan.ashx',
            latitude: 6.8761619,
            longitude: -5.4360561}
          ),
        knex('pinpoints')
          .insert(
            {list_id: 2,
            title: 'Camping trip',
            description: 'Loch Etive where Harry Hermione and Ron camp in Deathly Hallows 1',
            image: 'https://www.visitbritainshop.com/world/~/media/images/articles/harry%20potter%20filming%20locations%20guide/loch-etvie.ashx',
            latitude: 56.4996284,
            longitude: -5.3658186}
          )
      ])
    }),
  ])
};
