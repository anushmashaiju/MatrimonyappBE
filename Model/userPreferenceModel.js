const mongoose = require('mongoose');

const partnerPreferenceSchema = new mongoose.Schema({
  basic: {
    userId:{
      type:mongoose.Types.ObjectId,
      ref:'user'
      },
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

module.exports = mongoose.model('Preference-user', partnerPreferenceSchema);
