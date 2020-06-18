exports.up = function (knex) {
  return knex.schema.table('profile', (profile) => {
    profile.string('image_url', 255);
    profile.string('cloudinary_id', 255);
  });
};

exports.down = function (knex) {
  return knex.schema.table('profile', (profile) => {
    profile.dropColumn('cloudinary_id');
    profile.dropColumn('image_url');
  });
};
