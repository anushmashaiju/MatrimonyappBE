// controllers/profileController.js
const Profile = require('../Model/userProfileModel');

exports.createProfile = async (req, res) => {
  try {
    const profileData = req.body.personalDetails;
    const newProfile = new Profile(profileData);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};
