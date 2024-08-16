// routes/userRoutes.js
const express = require('express');
const { createRegister, getOppositeGenderProfiles, getRegisteredDetails, getAllRegisteredDetails, getCurrentUser, getcurrentRegisteredDetails, updateBasicDetails } = require('../Controller/userRegisterController');
const authenticateUser = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', authenticateUser, createRegister);
router.get('/register-details/:userId',authenticateUser,  getRegisteredDetails);
router.get('/opposite-gender-profiles', authenticateUser, getOppositeGenderProfiles);
router.get('/all-register-details', authenticateUser, getAllRegisteredDetails); // Route for fetching all registered details
router.get('/currentregister-details/:userId',authenticateUser,getcurrentRegisteredDetails);
router.put('/update-basic-details/:userId', authenticateUser, updateBasicDetails);
module.exports = router;
