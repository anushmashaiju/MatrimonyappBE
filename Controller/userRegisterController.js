const UserProfile = require('../Model/userRegisterModel');
const multer = require('multer');
const path = require('path');
const UserPersonal = require ('../Model/userProfileModel')
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
         // Assuming req.user contains the authenticated user information with ObjectId
        // const userId = req.user.id;
      const {
    
        name,
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
          name,
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
      const savedUserProfile = await  newUserProfile.save();
      res.status(200).json(savedUserProfile);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message || "Internal Server Error");
    }
  });

}
module.exports = {createProfile};
 

