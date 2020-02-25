const db = require('../data/dbConfig.js')

async function add(favorite) {
  await db('favorites').insert(favorite);

  return db('favorites')
    .where({ 'user_id': favorite.user_id, 'city_id': favorite.city_id  })
    .first();
}

function get(user_id) {
  return db('favorites')
    .join('users', 'favorites.user_id', 'users.id')
    .select(
      'users.id AS user_id',
      'users.username AS user_username',
      'favorites.city_id'
    )
    .where({ 'users.id': user_id });
}

function getAll() {
  return db('favorites');
}

function remove(user_id, city_id) {
  return db('favorites')
    .where({ 'user_id': user_id, 'city_id': city_id })
    .del();
}

module.exports = {
  add, 
  get,
  remove
}
