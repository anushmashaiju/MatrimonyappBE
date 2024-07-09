const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userIdRef: { type: String },
    height: { type: Number },
    weight: { type: Number },
    hobbies: { type: [String] },
    address: { type: String},
    bodyType: { type: String},
    maritalStatus: { type: String},
    religion: { type: String},
    caste: { type: String},
    preference: { type: String},
    motherTongue: { type: String},
    languagesKnown: { type: [String]},
    familyType: { type: String},
    motherName:{type: String},
    fatherName:{type: String},
    fatherOccupation:{type: String},
    motherOccupation:{type: String},
    sibilng:{type: String},
    horoscope: { type: String},
    photos: { type: [String]},
    videos: { type: [String]}
}, { timestamps: true });

const UserProfile = mongoose.model('register-user', userProfileSchema);

module.exports = UserProfile;
/*const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({

  basicDetails: {
   
    name:{
      type: String,
      required: true,
    },
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

const UserProfile = mongoose.model('register-user', userProfileSchema);

module.exports = UserProfile;
*/