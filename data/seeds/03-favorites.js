exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("favorites")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("favorites").insert([
        { id: 1, user_id: 1, city_id: 1 },
        { id: 2, user_id: 2, city_id: 1014 },
        { id: 3, user_id: 2, city_id: 51 },
        { id: 4, user_id: 3, city_id: 235 },
        { id: 5, user_id: 4, city_id: 2001 },
        { id: 6, user_id: 4, city_id: 3456 },
        { id: 7, user_id: 5, city_id: 3772 },
      ]);
    });
};
