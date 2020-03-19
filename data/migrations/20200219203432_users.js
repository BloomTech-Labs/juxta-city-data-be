
exports.up = function(knex) {
  return knex.schema.createTable('users', user=>{
      user.increments();
      user.string('username',124).notNullable().unique(); // Leave
      user.string('email', 124).notNullable().unique();  // Remove .notNullable()
      user.string('password', 248).notNullable();   // Leave
      user.string('first_name', 124).notNullable(); // Remove .notNullable()
      user.string('last_name', 124).notNullable(); // Remove .notNullable()
      user.date('dob').notNullable();  // Remove .notNullable()
      user.string('address', 248);
      user.string('city', 124);
      user.string('state', 124);
      user.integer('zip', 62);
      // googleId
      // facebookId
      // githubId
      // twitterId
      // linkedId
  })
  .createTable('favorites', favorite=>{
      favorite.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      favorite.integer('city_id').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favorites').dropTableIfExists('users');
};
