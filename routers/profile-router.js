const router = require('express').Router();

const Profile = require('../models/profile-model');
const Users = require('../models/users-model');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  let profile = req.body;

  try {
    const updatedProfile = await Profile.update(profile, id);

    if (!updatedProfile) {
      res.status(404).json({ msg: 'Profile could not be found' });
    }

    res.status(200).json({ msg: 'Profile successfully updated!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('You failed');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.remove(id);

    const user = await Users.remove(id);

    if (!profile && !user) {
      res.status(404).json({ msg: 'User or Profile not found' });
    }

    res.status(200).json({ msg: 'Profile and User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
