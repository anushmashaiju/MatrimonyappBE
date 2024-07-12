// routes/userRoutes.js
const express = require('express');
const { createRegister, getOppositeGenderProfiles, getRegisteredDetails } = require('../Controller/userRegisterController');
const authenticateUser = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', authenticateUser, createRegister);
router.get('/register-details/:userId', getRegisteredDetails);
router.get('/opposite-gender-profiles', authenticateUser, getOppositeGenderProfiles);

module.exports = router;
