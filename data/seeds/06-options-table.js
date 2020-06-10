exports.seed = function (knex) {
  return knex('options')
    .del()
    .then(function () {
      return knex('options').insert([
        { description: 'Very low 75', value: '1', question_id: 1 },
        { description: 'Low 76 - 99', value: '2', question_id: 1 },
        { description: 'Medium 100 - 110', value: '3', question_id: 1 },
        { description: 'High 111 - 149', value: '4', question_id: 1 },
        { description: 'Very high 150+', value: '5', question_id: 1 },
        { description: '17 and younger', value: '1', question_id: 2 },
        { description: '18 - 29', value: '2', question_id: 2 },
        { description: '30 - 46', value: '3', question_id: 2 },
        { description: '47 - 65', value: '4', question_id: 2 },
        { description: '66+', value: '5', question_id: 2 },
        { description: 'No preference', value: '1', question_id: 3 },
        { description: 'Below 10k', value: '2', question_id: 3 },
        { description: '10K - 30K', value: '3', question_id: 3 },
        { description: '31k - 99k', value: '4', question_id: 3 },
        { description: 'Above 1 million', value: '5', question_id: 3 },
        { description: 'No preference', value: '1', question_id: 4 },
        { description: '0 - 10 minutes', value: '2', question_id: 4 },
        { description: '10 - 20 minutes', value: '3', question_id: 4 },
        { description: '20 - 30 minutes', value: '4', question_id: 4 },
        { description: '45+ minutes', value: '5', question_id: 4 },
      ]);
    });
};
