exports.up = function (knex) {
  return knex.schema
    .createTable("users", (user) => {
      user.increments('id');
      user.string("username", 255).notNullable().unique();
      user.string("email", 255).notNullable().unique();
      user.string("password", 255).notNullable();
      user.string("first_name", 255);
      user.string("last_name", 255);
      user.date("dob");
      user.string("address", 255);
      user.string("city", 255);
      user.string("state", 255);
      user.integer("zip", 62);
      user.string("image", 255); // string is for the unique URL
      user.string("cloudinary_public_id", 255);
     
    })
    .createTable("favorites", (favorite) => {
      favorite.increments('id');
      favorite
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      favorite.integer("city_id").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites").dropTableIfExists("users");
};
