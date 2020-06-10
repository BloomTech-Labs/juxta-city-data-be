const db = require('../data/dbConfig');

function findById(id) {
  return db('profile').where({ id }).first();
}

module.exports = {
  findById
};
