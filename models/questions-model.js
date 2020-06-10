const db = require('../data/dbconfig.js');

function find() {
  return db('questions');
}

function getAnswerOptionsById(id) {
  return db('options')
    .where('options.question_id', id)
    .then(options => {
      return options;
    });
}

function getQuestions(id) {
  return db('questions')
    .where('questions.id', id)
    .then(questions => {
      return questions;
    });
}

async function getQuestionWithOptions(id) {
  let questions = await getQuestions(id);
  questions[0]['options'] = await getAnswerOptionsById(id);
  return questions;
}

async function getSurveyData() {
  let result = await db('questions as q')
    .join('options as o', 'o.question_id', 'q.id')
    .select(
      'q.id',
      'q.question',
      'q.name',
      'o.id as option_id',
      'o.description',
      'o.value',
      'o.question_id'
    );

  let newObj = {};
  newObj.questions = {};
  let response = [];

  result.map(item => {
    if (!newObj.questions[item.id]) {
      newObj.questions[item.id] = {
        id: item.id,
        question: item.question,
        name: item.name,
        options: [],
      };
    }

    newObj.questions[item.id].options.push({
      id: item.option_id,
      description: item.description,
      value: item.value,
    });
  });

  for (let newItem in newObj.questions) {
    response.push(newObj.questions[newItem]);
  }

  return response;
}

module.exports = {
  find,
  getSurveyData,
  getQuestionWithOptions,
};
