// userRegisterModel.js

const mongoose = require('mongoose');

const userRegisterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
  basicDetails: {
    name: { type: String,  },
    age: { type: Number,  },
    gender: { type: String,  },
    dateOfBirth: { type: Date,  },
    qualification: { type: String,  },
    hobbies: { type: String,  },
    interest: { type: String,  },
    drinkingHabits: { type: String,  },
    smokingHabits: { type: String,  },
    profilePicture: { type: String, required: false },
    multipleImages: { type: [String], required: false },
    shortReel: { type: String, required: false },
  },
});

module.exports = mongoose.model('Registered-user', userRegisterSchema);
