const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleID: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    qualification: {
        type: String,
    },
    professional: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String
    },
    basicDetails: {
        gender: { type: String},
      },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
