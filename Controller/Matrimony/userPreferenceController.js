const PartnerPreference = require('../../Model/Matrimony/userPreferenceModel');

const createPartnerPreference = async (req, res) => {
    try {
        const { preferences } = req.body;
        const userId = req.userId; // Assuming userId is extracted from authenticated user

        // Validate preferenceData here if necessary

        const newPreference = new PartnerPreference({
            userId,
            basic: preferences.basic,
            religious: preferences.religious,
            professional: preferences.professional,
            location: preferences.location,
            aboutMyPartner: preferences.aboutMyPartner,
        });

        await newPreference.save();
        res.status(201).json(newPreference);
    } catch (error) {
        console.error('Error creating partner preference:', error);
        res.status(500).json({ message: 'Error creating partner preference', error: error.message });
    }
};

const getPartnerPreferenceByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from request parameters

        const preference = await PartnerPreference.findOne({ userId });
        if (!preference) {
            return res.status(404).json({ message: 'Partner preference not found' });
        }

        res.status(200).json(preference);
    } catch (error) {
        console.error('Error fetching partner preference:', error);
        res.status(500).json({ message: 'Error fetching partner preference', error: error.message });
    }
};
module.exports = {createPartnerPreference,getPartnerPreferenceByUserId}