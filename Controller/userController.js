const UserProfile = require('../Model/userProfileModel');
const multer = require('multer');
const path = require('path');

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'multipleImages', maxCount: 10 },
  { name: 'shortReel', maxCount: 1 },
]);

const createProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).json({ message: 'Error uploading files' });
    }

    try {
      const {
        age,
        dateOfBirth,
        qualification,
        hobbies,
        interest,
        drinkingHabits,
        smokingHabits,
      } = req.body;

      const profilePicture = req.files.profilePicture
        ? req.files.profilePicture[0].buffer.toString('base64')
        : null;

      const multipleImages = req.files.multipleImages
        ? req.files.multipleImages.map(file => file.buffer.toString('base64'))
        : [];

      const shortReel = req.files.shortReel
        ? req.files.shortReel[0].buffer.toString('base64')
        : null;

      const newUserProfile = new UserProfile({
        basicDetails: {
          age,
          dateOfBirth,
          qualification,
          hobbies,
          interest,
          drinkingHabits,
          smokingHabits,
          profilePicture,
          multipleImages,
          shortReel,
        },
      });

      await newUserProfile.save();

      res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};

module.exports = createProfile;
