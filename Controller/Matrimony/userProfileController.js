const Profile = require('../../Model/Matrimony/userProfileModel');

const createProfile = async (req, res) => {
  try {
    const profileData = req.body.personalDetails;
    const id = userId; // Get the userId from the req object

    const newProfile = new Profile({
      ...profileData,
      userId
    });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};
const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error });
  }
};

module.exports = { createProfile,getProfileByUserId ,getAllProfiles };
