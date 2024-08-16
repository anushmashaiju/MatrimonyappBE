
const UserRegister = require('../Model/userRegisterModel');
const User = require('../Model/authModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'multipleImages', maxCount: 10 },
  { name: 'shortReel', maxCount: 1 },
]);

const createRegister = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).json({ message: 'Error uploading files' });
    }

    try {
      const {
        name,
        age,
        gender,
        dateOfBirth,
        qualification,
        hobbies,
        interest,
        drinkingHabits,
        smokingHabits,
      } = req.body;

      const id = userId; // Use req.userId set in the middleware

      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const profilePicture = req.files.profilePicture
        ? req.files.profilePicture[0].buffer.toString('base64')
        : '';

      const multipleImages = req.files.multipleImages
        ? req.files.multipleImages.map(file => file.buffer.toString('base64'))
        : [];

      const shortReel = req.files.shortReel
        ? req.files.shortReel[0].buffer.toString('base64')
        : '';

      const newUserRegister = new UserRegister({
        userId: id,
        basicDetails: {
          name,
          age,
          gender,
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

      const savedUserRegister = await newUserRegister.save();
      res.status(200).json(savedUserRegister);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message || 'Internal Server Error');
    }
  });
};

const getRegisteredDetails = async (req, res) => {
  try {
   const { userId } = req.params;  // Extract userId from request parameters
console.log("my user id is",userId)
    const registeredDetails = await UserRegister.findOne({ userId });
     // Assuming User and UserRegister model connection

     if (!registeredDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.status(200).json(registeredDetails);
  } catch (error) {
    console.error('Error fetching registered details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getcurrentRegisteredDetails = async (req, res) => {
  try {
    const id = userId; // Extract userId from request parameters
console.log("my user id is",userId)
    const registeredDetails = await UserRegister.findOne({ userId });
     // Assuming User and UserRegister model connection

     if (!registeredDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.status(200).json(registeredDetails);
  } catch (error) {
    console.error('Error fetching registered details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to fetch profiles of the opposite gender
const getOppositeGenderProfiles = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assuming req.userId contains the logged-in user's ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oppositeGender = user.basicDetails.gender === 'male' ? 'female' : 'male';
    const profiles = await UserRegister.find({ 'basicDetails.gender': oppositeGender });
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRegisteredDetails = async (req, res) => {
  try {
    const registeredDetails = await UserRegister.find();
    res.status(200).json(registeredDetails);
  } catch (error) {
    console.error('Error fetching all registered details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    //const userId = req.userId; // Use req.userId set in the middleware
const id = userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('basicDetails');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      userId: id,
     gender,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update basic details
const updateBasicDetails = async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters
  const {
      name,
      age,
      gender,
      dateOfBirth,
      qualification,
      hobbies,
      interest,
      drinkingHabits,
      smokingHabits,
      profilePicture, // Assuming you handle image uploads separately
      multipleImages,
      shortReel,
  } = req.body;

  try {
      const updatedUserRegister = await UserRegister.findOneAndUpdate(
          { userId },
          {
              $set: {
                  'basicDetails.name': name,
                  'basicDetails.age': age,
                  'basicDetails.gender': gender,
                  'basicDetails.dateOfBirth': dateOfBirth,
                  'basicDetails.qualification': qualification,
                  'basicDetails.hobbies': hobbies,
                  'basicDetails.interest': interest,
                  'basicDetails.drinkingHabits': drinkingHabits,
                  'basicDetails.smokingHabits': smokingHabits,
                  'basicDetails.profilePicture': profilePicture,
                  'basicDetails.multipleImages': multipleImages,
                  'basicDetails.shortReel': shortReel,
              },
          },
          { new: true } // Return the updated document
      );

      if (!updatedUserRegister) {
          return res.status(404).json({ message: 'User details not found' });
      }

      res.status(200).json(updatedUserRegister);
  } catch (error) {
      console.error('Error updating basic details:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  createRegister,
  getRegisteredDetails,
  getOppositeGenderProfiles, getAllRegisteredDetails,getCurrentUser,getcurrentRegisteredDetails ,updateBasicDetails,
};
