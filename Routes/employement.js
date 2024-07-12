const express = require('express');
const router = express.Router();
const authenticateToken = require("../Middleware/authMiddleware");
const employementController = require('../Controller/employementController');

router.post('/employement', authenticateToken, employementController.saveEmploymentData);

module.exports = router;
