// routes/partnerPreferenceRouter.js
const express = require('express');
const router = express.Router();
const partnerPreferenceController = require('../../Controller/Matrimony/userPreferenceController');
const authenticateUser = require('../../Middleware/authMiddleware');
//const { authMiddleware } = require('../Middleware/authMiddleware');

router.post('/preferences',authenticateUser,partnerPreferenceController.createPartnerPreference);
router.get('/partnerpreferences/:userId', partnerPreferenceController.getPartnerPreferenceByUserId);

module.exports = router;
