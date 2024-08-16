const { generateToken } = require('../utils/jwt');
const User = require('../Model/authModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

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
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = generateToken(newUser);

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true,secure:true, maxAge: 3600000 });

        // Respond with success message and token
        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, secure:true,maxAge: 3600000 });

        // Remove sensitive data from user object
        user.password = undefined;

        // Respond with success message, token, and user details
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// New function to make a user an admin
const makeAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAdmin = true;
        await user.save();

        res.status(200).json({ message: 'User is now an admin', user });
    } catch (error) {
        console.error('Error making user admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getUserDetails = async (req, res) => {
    const id = userId;
    console.log('admin============',userId)
    try {
        const user = await User.findById(userId).select('firstName lastName email profilePic isAdmin');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signUp, login ,makeAdmin ,getUserDetails };
