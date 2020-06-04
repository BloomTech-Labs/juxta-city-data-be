exports.up = function (knex) {
  return knex.schema
    .createTable('users', user => {
      user.increments('id');
      user.string('username', 255).notNullable().unique();
      user.string('email', 255).notNullable().unique();
      user.string('password', 255).notNullable();
    })
    .createTable('profile', profile => {
      profile.increments('id');
      profile.string('first_name', 255);
      profile.string('last_name', 255);
      profile.date('dob');
      profile.string('address', 255);
      profile.string('city', 255);
      profile.string('state', 255);
      profile.integer('zip', 62);
      profile
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('favorites', favorite => {
      favorite.increments('id');
      favorite
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      favorite.integer('city_id').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('profile')
    .dropTableIfExists('users');
};
