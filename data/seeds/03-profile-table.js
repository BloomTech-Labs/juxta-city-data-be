exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profile')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {
          user_id: 1,
          first_name: 'Lester',
          last_name: 'Kester',
          dob: '2001-02-02',
          address: '876 w 16th St',
          city: 'New York',
          state: 'New York',
          zip: 92312,
        },
        {
          user_id: 2,
          first_name: 'Jake',
          last_name: 'Baker',
          dob: '1974-11-01',
          address: '1123 N Curly court',
          city: 'Portland',
          state: 'Oregon',
          zip: 45612,
        },
        {
          user_id: 3,
          first_name: 'Tim',
          last_name: 'Heidecker',
          dob: '1982-2-09',
          address: '615 W Ward Rd',
          city: 'Seattle',
          state: 'Washington',
          zip: 68762,
        },
        {
          user_id: 4,
          first_name: 'Jon',
          last_name: 'Stamos',
          dob: '1998-11-18',
          address: '1123 NE Bluebery Ln',
          city: 'Flint',
          state: 'Michigan',
          zip: 87642,
        },
        {
          user_id: 5,
          first_name: 'Stacy',
          last_name: 'Stodem',
          dob: '1994-2-17',
          address: '4138 S Cheese St',
          city: 'Boulder',
          state: 'Colorado',
          zip: 74085,
        },
      ]);
    });
};
