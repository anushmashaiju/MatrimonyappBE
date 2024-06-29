const express = require('express');
const router = express.Router();
const createProfile = require('../Controller/userController');

router.post('/profile', createProfile);

module.exports = router;
