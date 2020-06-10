const router = require('express').Router();

const Profile = require('../models/profile-model');

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

module.exports = router;
