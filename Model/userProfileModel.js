// models/Profile.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
});

const profileSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'user'
    },
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  noOfSiblings: { type: Number, required: true },
  noOfBrothers: { type: Number, required: false },
  noOfSisters: { type: Number, required: false },
  noOfMarried: { type: Number, required: false },
  noOfUnmarried: { type: Number, required: false },
  familyClass: { type: String, required: true },
  familyValue: { type: String, required: true },
  userIncome: { type: Number, required: true },
  occupation: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  complexion: { type: String, required: true },
  disability: { type: String, required: false },
  religion: { type: String, required: true },
  caste: { type: String, required: true },
  subCaste: { type: String, required: true },
  location: locationSchema,
  horoscope: { type: String, required: true },
});

module.exports = mongoose.model('profile-user', profileSchema);
