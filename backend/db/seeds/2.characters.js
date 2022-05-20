/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('characters').del()
  await knex('characters').insert([
    {
      'id': 1,
      'name': 'Chewbacca',
      'description': 'Chewbacca, known affectionately to his friends as Chewie, is a Wookiee male warrior, smuggler, mechanic, pilot, and resistance fighter.',
      'planet': 'FN-BBA-22',
      'picture_url': 'https://upload.wikimedia.org/wikipedia/en/6/6d/Chewbacca-2-.jpg',
    },
    {
      'id': 2,
      'name': 'Norbert Ériu',
      'description': 'Norbert is a farmer.',
      'planet': 'FN-BBA-22',
      'picture_url': 'https://images.unsplash.com/photo-1588422333078-44ad73367bcb',
    },
    {
      'id': 3,
      'name': 'Sümeyye Sitora',
      'description': 'Sümeyye is a teacher.',
      'planet': 'FN-BBA-22',
      'picture_url': 'https://images.unsplash.com/photo-1606103955054-99913abd77c8',
    },
    {
      'id': 4,
      'name': 'Cori Blagovesta',
      'description': 'Cori is known as the most teasing person in the galaxy.',
      'planet': 'XT-FOE-43',
      'picture_url': 'https://images.unsplash.com/photo-1530071100468-90954e4921d0',
    },
    {
      'id': 5,
      'name': 'Nisha Amala',
      'description': 'Nisha is curious about what happens in the Outer Rim',
      'planet': 'XT-FOE-43',
      'picture_url': 'https://images.unsplash.com/photo-1592210566091-9e18a5fc01b4',
    },
    {
      'id': 6,
      'name': 'Spyro Gerarda',
      'description': 'Spyro is Spyro',
      'planet': 'EM-PVA-98',
      'picture_url': 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc',
    },
  ]);
};
