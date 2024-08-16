const express = require('express');
const router = express.Router();
const profileController = require('../../Controller/Matrimony/userProfileController');
const authenticateUser = require('../../Middleware/authMiddleware');

router.post('/personal-details', authenticateUser, profileController.createProfile);
router.get('/personal-details/:userId', authenticateUser, profileController.getProfileByUserId);
router.get('/currentpersonal-details/:userId', authenticateUser, profileController.getCurrentProfileByUserId);
router.get('/all-personal-details', authenticateUser, profileController.getAllProfiles);

module.exports = router;
