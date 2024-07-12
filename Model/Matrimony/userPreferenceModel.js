// Model/Matrimony/userPreferenceModel.js

const mongoose = require('mongoose');

const partnerPreferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    basic: {
        ageRange: {
            min: Number,
            max: Number
        },
        height: { type: String },
        maritalStatus: { type: String },
        motherTongue: { type: String },
        eatingHabits: { type: String },
        drinkingHabits: { type: String },
        smokingHabits: { type: String },
    },
    religious: {
        religion: { type: String },
        caste: { type: String },
        subCaste: { type: String },
    },
    professional: {
        education: { type: String },
        employedIn: { type: String },
        annualIncome: { type: String },
    },
    location: {
        state: { type: Array },
        district: { type: Array }
    },
    aboutMyPartner: { type: String }
});

module.exports = mongoose.model('Partner-Preference', partnerPreferenceSchema);
