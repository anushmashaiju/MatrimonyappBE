const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    basicDetails: {
       
        age: {
            type: Number,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        qualification: {
            type: String,
            required: true
        },
        hobbies: {
            type: String,
            required: true
        },
        interest: {
            type: String,
            required: true
        },
        drinkingHabits: {
            type: String,
            enum: ['yes', 'no'],
            required: true
        },
        smokingHabits: {
            type: String,
            enum: ['yes', 'no'],
            required: true
        },
        profilePicture: {
            type: String  // Assuming you will store file paths or URLs
        },
        multipleImages: [{
            type: String  // Array of file paths or URLs
        }],
        shortReel: {
            type: String  // Assuming you will store file paths or URLs
        }
    }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
