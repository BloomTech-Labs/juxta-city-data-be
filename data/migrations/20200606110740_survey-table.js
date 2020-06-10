exports.up = function (knex) {
  return knex.schema
    .createTable('questions', question => {
      question.increments('id');
      question.string('question', 255).notNullable().unique();
      question.string('name', 255).notNullable().unique();
    })
    .createTable('options', option => {
      option.increments('id');
      option.string('description', 255).notNullable();
      option.string('value', 255).notNullable();
      option
        .integer('question_id')
        .unsigned()
        .notNullable()
        .references('questions.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema

    .dropTableIfExists('options')
    .dropTableIfExists('questions');
};
