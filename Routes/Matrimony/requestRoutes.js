const express = require('express');
const router = express.Router();
const { sendRequest, getNotifications, acceptRequest, rejectRequest, shortlistUser } = require('../../Controller/Matrimony/requestController');
const authenticateUser = require('../../Middleware/authMiddleware');

// Send request and notification
router.post('/requests',authenticateUser, sendRequest);

// Get notifications for current user
router.get('/notifications',authenticateUser, getNotifications);

// Accept request
router.post('/notifications/:id/accept',authenticateUser, acceptRequest);

// Reject request
router.post('/notifications/:id/reject', authenticateUser,rejectRequest);

// POST request to shortlist a user
router.post('/shortlist',  authenticateUser,shortlistUser);

module.exports = router;
