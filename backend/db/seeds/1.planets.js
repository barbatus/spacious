/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('planets').del()
  await knex('planets').insert([
    {
      'id': 1,
      'name': 'Tatooine',
      'description': 'Tatooine is a sparsely inhabited circumbinary desert planet located in the galaxy\'s Outer Rim Territories.',
      'code': 'XT-FOE-43',
      'picture_url': 'https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg'
    },
    {
      'id': 2,
      'name': 'Aargau',
      'description': 'Aargau is a planet in the Zug system of the Core Worlds region, not far from Coruscant and the Corellian Run.',
      'code': 'FN-BBA-22',
      'picture_url': 'https://static.wikia.nocookie.net/starwars/images/a/a9/Aargau.jpg'
    },
    {
      'id': 3,
      'name': 'Malastare',
      'description': 'Malastare is the high-gravity homeworld of the quadrupedal Dug race, on the Hydian Way.',
      'code': 'EM-PVA-98',
      'picture_url': 'https://static.wikia.nocookie.net/starwars/images/d/df/MalastareNEGAS.jpg'
    },
  ]);
};
