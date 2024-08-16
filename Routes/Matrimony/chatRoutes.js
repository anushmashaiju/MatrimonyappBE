const express = require('express');
const { sendMessage, getMessages, getChattedUsers } = require('../../Controller/Matrimony/chatController');
const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages/:senderId/:receiverId', getMessages);
router.get('/chattedUsers/:userId', getChattedUsers);

module.exports = router;
