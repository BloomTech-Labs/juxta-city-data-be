const db = require('../data/dbConfig.js');

async function add(user) {
  const [ id ] = await db('users').returning('id').insert(user);

  return db('users')
    .where({ id })
    .first();
}

function getBy(filter) {
  return db('users')
    .where(filter)
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getAll() {
  return db('users');
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

async function update(user, id) {
  await db('users')
    .where({ id })
    .update(user);

  return db('users')
    .where({ id })
    .first();
}

module.exports = {
  add,
  getBy,
  getById,
  getAll,
  remove,
  update
}
