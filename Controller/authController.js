const User = require('../Model/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecretKey = process.env.JWT_SECRET || 'your-jwt-secret-key';

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
      dateOfBirth: dob, // Assuming 'dob' from req.body is the date of birth
      phone,
      email,
      password: hashedPassword
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

const login = [
  body('email').isEmail(),
  body('password', 'Incorrect password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(payload, jwtSecretKey, { expiresIn: '2d' });

      return res.json({ success: true, authToken });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
];

module.exports = { signUp, login };
