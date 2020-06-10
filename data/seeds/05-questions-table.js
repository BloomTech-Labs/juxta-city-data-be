exports.seed = function (knex) {
  return knex('questions')
    .del()
    .then(function () {
      return knex('questions').insert([
        {
          name: 'cost_of_living',
          question:
            'What is an acceptable cost of living index for your new city?',
        },
        {
          name: 'median_age',
          question: 'What is your age group?',
        },
        {
          name: 'population',
          question: 'What is the population of your dream city?',
        },
        {
          name: 'average_commute',
          question: 'What is a reasonable commute time for routine travel?',
        },
      ]);
    });
};
