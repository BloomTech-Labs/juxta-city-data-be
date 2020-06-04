exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'lowman',
          email: 'lowman21@gmail.com',
          password: 'password123',
        },
        {
          username: 'steezywatercooler',
          email: 'JakeSnake@gmail.com',
          password: 'foolme1ce',
        },
        {
          username: 'biscuits',
          email: 'TimmyH@gmail.com',
          password: 'ch33s3p0tat03s',
        },
        {
          username: 'jorts64',
          email: 'Jorty21@gmail.com',
          password: 'watercolors67#',
        },
        {
          username: 'stickerLover!',
          email: 'StickerClicker@gmail.com',
          password: 'passme3',
        },
      ]);
    });
};
