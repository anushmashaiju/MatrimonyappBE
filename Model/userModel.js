const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: String,
  dob: Date,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    required: function() {
      return !this.password;
    }
  },
  displayName: {
    type: String,
    required: function() {
      return !this.password;
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
