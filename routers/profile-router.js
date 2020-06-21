const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const Profile = require('../models/profile-model.js');
const { removeDir } = require('../removeTmpDir');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

router.get('/test', (req, res) => {
  res.send('Profile is building');
});

//GETs all the profiles only
// http://localhost:5000/api/profile/
router.get('/', (req, res) => {
  Profile.get()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the profiles',
        error
      });
    });
});

//GETs all the profiles and registration info (users table + profile table)
router.get('/all', (req, res) => {
  Profile.getAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the profiles',
        error
      });
    });
});

// GET users by id  localhost:5000/api/profile/:id/user
router.get('/:id/user', (req, res) => {
  const id = req.params.id;
  Profile.find(id)
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: 'User with the specifid id cannot be found!' });
      }
    })
    .catch((err) =>
      res.status(500).json({
        error:
          'There was an error while retriving the user from to the database',
        err
      })
    );
});

// GETs only the profile based on the user_id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Profile.findProfiles(id)
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'Profile with the specifid user_id cannot be found!'
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        error:
          'There was an error while retriving the user from to the database',
        err
      })
    );
});

// GETs all the profile  based on the user_id (userstable and profile table)
router.get('/:id/all', (req, res) => {
  const id = req.params.id;

  Profile.getProfileByUserId(id)
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'Profile with the specifid user_id cannot be found!'
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        error:
          'There was an error while retriving the users info from to the database!'
      })
    );
});

// INSERT New PROFILE
//http://localhost:5000/api/profile/:id
router.post('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  // console.log(req.params, 'params');
  // console.log(req.body, 'BODY');

  Profile.findProfiles(id).then((profiles) => {
    //console.log(profiles, 'Returns the profiles with the specified id if exists');
    if (profiles.length <= 0) {
      Profile.find(id)
        .then((response) => {
          //console.log(response.length, 'Find user by id RESPONSE');
          if (response.length > 0) {
            Profile.insertProfileInfo({ ...body, user_id: id }).then(() =>
              res.status(201).json({ message: 'Profile added successfuly!' })
            );
          } else {
            res
              .status(404)
              .json({ message: 'User with the specifid id cannot be found!' });
          }
        })
        .catch(() =>
          res.status(500).json({
            message:
              'There was an error while saving the profile to the database!'
          })
        );
    } else {
      res.status(500).json({
        message: `A profile for ${profiles[0].first_name} already exists!`
      });
      console.log(`A profile for ${profiles[0].first_name} already exists!`);
    }
  });
});

// UPDATE EXISTING PROFILE
// http://localhost:5000/api/profile/:id
// Body format:
// {
//   "first_name": "Stacy",
//   "last_name": "Stodem",
//   "dob": "1994-02-17T08:00:00.000Z",
//   "address": "4138 S Cheese St",
//   "city": "Boulder",
//   "state": "Colorado",
//   "zip": 74085,
//   "surveyinfo": {
//     "question":"Question ???",
//     "name":"blah, blah",
//     "options":"{
//        'value':'3',
//        'description':'it works'
//      }"
//    }
// }
// If you want to update only one column you can send only that info

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Profile.findProfile(id).then((profile) => {
    //console.log(profiles, 'Returns the profiles with the specified id if exists');
    if (profile) {
      Profile.updateProfileInfo(id, body)
        .then((updatedProfile) => {
          res.status(200).json({
            message: 'success uptating the profile',
            info: body,
            updatedProfile
          });
        })
        .catch((err) => {
          res.status(500).json({
            error:
              'There was an error while saving the profile to the database!',
            err
          });
        });
    } else {
      res
        .status(404)
        .json({ message: 'The profile with the specifid id cannot be found!' });
    }
  });
});

//DELETE PROFILE
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Profile.deleteProfile(id)
    .then((profile) => {
      if (profile > 0) {
        res.status(200).json({ message: 'The profile has been deleted' });
      } else {
        res.status(404).json({
          message: 'The profile with the specified id could not be found!'
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error removing the profile', error });
    });
});

// add JSON with survey answers in the profile table--->>>>>>>>>>>>>>>>>
// PUT http://localhost:5000/api/profile/:id/answers

router.put('/:id/answers', async (req, res) => {
  const { id } = req.params;
  let body = req.body;

  // console.log(id, 'the put id');
  // console.log(body, 'the put body');

  Profile.findProfile(id)
    .then((response) => {
      // console.log(response, 'response');
      Profile.addAnswersJson(body, id).then((profile) => {
        // console.log(profile, 'profile response');
        if (profile) {
          res.status(200).json({ success: true, profile });
        } else {
          res.status(404).json({
            message: 'The profile with the specified ID does not exist.'
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: 'The user information could not be modified.',
        err
      });
    });
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

router.put('/:id/profile_image', (req, res) => {
  const file = req.files.image;
  const { id } = req.params;

  cloudinary.uploader.upload(
    file.tempFilePath,
    (options = { public_id: req.params.cloudinary_id }),
    function (results) {
      removeDir();
      Profile.addImage(
        {
          ...req.body,
          image_url: results.url,
          cloudinary_id: results.public_id
        },
        id
      )
        .then((profile) => {
          res.status(200).json(profile);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: 'The image could not be uploaded', err });
        });
    }
  );
});

router.put('/:id/profile_image/:cloudinary_id', (req, res) => {
  const { cloudinary_id } = req.params;

  cloudinary.uploader
    .destroy(cloudinary_id)
    .then(() => {
      Profile.deleteImage(cloudinary_id)
        .then((image) => {
          if (image) {
            res.status(200).json({ message: 'The image has been removed' });
          } else {
            res.status(404).json({
              message: 'Could not find an image with the given public id'
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: 'Failed to remove image', err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to remove image from cloudinary', err });
    });
});

module.exports = router;
