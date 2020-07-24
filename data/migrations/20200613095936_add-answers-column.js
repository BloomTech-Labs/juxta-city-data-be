exports.up = function (knex) {
  return knex.schema.table("profile", (profile) => {
    profile.json("surveyinfo");
  });
};

exports.down = function (knex) {
  return knex.schema.table("profile", (profile) => {
    profile.dropColumn("surveyinfo");
  });
};
