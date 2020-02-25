
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {user_id:1, city_id:1},
        {user_id:2, city_id:1014},
        {user_id:2, city_id:51},
        {user_id:3, city_id:235},
        {user_id:4, city_id:2001},
        {user_id:4, city_id:3456},
        {user_id:5, city_id:3772},
      ]);
    });
};
