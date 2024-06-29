const UserProfile = require('../Model/userProfileModel');

const createProfile = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log request body for debugging

        // Check if req.body or basicDetails are missing
        if (!req.body || !req.body.basicDetails) {
            return res.status(400).json({ message: 'Missing profile data' });
        }

        // Validate that all required fields are present in req.body.basicDetails
        const { basicDetails } = req.body;
        if (!basicDetails.smokingHabits ||
            !basicDetails.drinkingHabits ||
            !basicDetails.interest ||
            !basicDetails.hobbies ||
            !basicDetails.qualification ||
            !basicDetails.dateOfBirth ||
            !basicDetails.age ||
            !basicDetails.gender) {
            return res.status(400).json({ message: 'Missing required fields in basicDetails' });
        }

        const userProfile = new UserProfile(req.body);
        await userProfile.save();
        res.status(201).json({ message: 'Profile saved successfully!', userProfile });
    } catch (error) {
        console.error('Error saving profile:', error); // Log detailed error
        res.status(500).json({ message: 'Error saving profile', error });
    }
};
module.exports = createProfile;