const express = require('express');
const router = express.Router();
const { createProfile } = require('../Controller/userRegisterController');

// Route for creating a new user profile
router.post('/register', createProfile);


module.exports = router;
