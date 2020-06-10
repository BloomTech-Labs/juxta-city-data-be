const db = require('../data/dbConfig');

function findById(id) {
  return db('profile').where({ id }).first();
}

function remove(id) {
  return db('profile').where({ id }).del();
}

module.exports = {
  findById,
  remove
};
