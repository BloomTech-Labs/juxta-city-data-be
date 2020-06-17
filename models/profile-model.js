const db = require('../data/dbConfig.js');

function get() {
  return db('profile');
}

function getAll() {
  return db('profile')
    .join('users', 'profile.user_id', '=', 'users.id')
    .select('*');
}
function getProfileByUserId(id) {
  return db('profile')
    .join('users', 'profile.user_id', '=', 'users.id')
    .where({ user_id: id });
}
//INSERT NEW PROFILE BASED ON user_id--------->>>>
async function insertProfileInfo(profileInfo) {
  return await db('profile')
    .insert(profileInfo)
    .then((ids) => ({ id: ids[0] }));
}

function find(id) {
  return db('users').where({ id });
}

function findProfiles(id) {
  return db('profile').where({ user_id: id });
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// UPDATE EXISTING PROFILE
function updateProfileInfo(id, updatedInfo) {
  return db('profile').where({ user_id: id }).update(updatedInfo);
}

// DELETE PROFILE
function deleteProfile(id) {
  return db('profile').where({ user_id: id }).del();
}

// add JSON with survey answers in the profile table
function addAnswersJson(info, id) {
  return db('profile')
    .where('user_id', id)
    .update({ surveyinfo: JSON.stringify(info) });
}

function addImage(image, id) {
  return db('profile').where('user_id', id).update(image);
}

function findProfile(id) {
  return db('profile').where({ user_id: id }).first();
}

module.exports = {
  get,
  getAll,
  findProfiles,
  getProfileByUserId,
  find,
  insertProfileInfo,
  findProfile,
  addAnswersJson,
  addImage,
  updateProfileInfo,
  deleteProfile
};
