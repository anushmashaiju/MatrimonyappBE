// routes/profileRouter.js
const express = require('express');
const router = express.Router();
const profileController = require('../Controller/userProfileController');
const { authMiddleware } = require('../Middleware/authMiddleware');

router.post('/personal-details', profileController.createProfile);

module.exports = router;
