const User = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, gender, dob, phone, email, password } = req.body;

        // Check if the email is already registered
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            gender,
            dob,
            phone,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }
  
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
        return res.status(200).json({ message: 'Login successful', token });
      });
    })(req, res, next); // Make sure to pass next here
  };
  
  module.exports = { login, signUp };
