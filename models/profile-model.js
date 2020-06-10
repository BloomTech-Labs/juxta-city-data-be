const db = require('../data/dbConfig');

function findById(id) {
  return db('profile').where({ id }).first();
}

async function update(profile, id) {
  await db('profile').where({ id }).update(profile);

  return db('profile').where({ id }).first();
}

function remove(id) {
  return db('profile').where({ id }).del();
}

module.exports = {
  findById,
  update,
  remove
};
