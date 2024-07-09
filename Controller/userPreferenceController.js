// controllers/partnerPreferenceController.js
const PartnerPreference = require('../Model/userPreferenceModel');

exports.createPartnerPreference = async (req, res) => {
  try {
    const preferenceData = req.body;
    
    // Validate preferenceData here
    if (!preferenceData.basic || !preferenceData.religious || !preferenceData.professional || !preferenceData.location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPreference = new PartnerPreference(preferenceData);
    await newPreference.save();
    res.status(201).json(newPreference);
  } catch (error) {
    console.error('Error creating partner preference:', error);
    res.status(500).json({ message: 'Error creating partner preference', error: error.message });
  }
};
