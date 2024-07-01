const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  basicDetails: {
    age: {
      type: Number,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    hobbies: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    drinkingHabits: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
    smokingHabits: {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
    profilePicture: {
      type: String, // Base64 string
    },
    multipleImages: [
      {
        type: String, // Base64 string
      },
    ],
    shortReel: {
      type: String, // Base64 string
    },
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
