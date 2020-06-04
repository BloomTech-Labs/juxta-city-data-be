exports.up = function (knex) {
  return knex.schema.table('users', user => {
    user.string('first_name', 255).nullable().alter();
    user.string('last_name', 255).nullable().alter();
    user.date('dob').nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', user => {
    user.dropColumn('dob').notNullable().alter();
    user.dropColumn('last_name').notNullable().alter();
    user.dropColumn('first_name').notNullable().alter();
  });
};
