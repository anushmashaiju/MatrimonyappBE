// routes/partnerPreferenceRouter.js
const express = require('express');
const router = express.Router();
const partnerPreferenceController = require('../Controller/userPreferenceController');
const { authMiddleware } = require('../Middleware/authMiddleware');

router.post('/preferences',partnerPreferenceController.createPartnerPreference);

module.exports = router;
