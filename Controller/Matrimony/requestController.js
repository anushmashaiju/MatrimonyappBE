const Notification = require('../../Model/Matrimony/notificationModel');
const Request = require('../../Model/Matrimony/requestModel');
const User = require('../../Model/authModel');

const sendRequest = async (req, res) => {
    const { senderId, receiverId, senderName } = req.body;
  
    try {
      // Validate senderId presence
      if (!senderId) {
        return res.status(400).json({ message: 'senderId is required' });
      }
  
      // Create request
      const newRequest = new Request({ senderId, receiverId });
      await newRequest.save();
  
      // Create notification
      const newNotification = new Notification({
        userId: receiverId,
        message: `You have a request from ${senderName}`,
        type: 'request',
        senderId
      });
      await newNotification.save();
  
      res.status(201).send('Request and notification sent');
    } catch (error) {
      console.error('Error sending request and notification:', error);
      res.status(500).send('Internal server error while processing request');
    }
  };

  
  const getNotifications = async (req, res) => {
    try {
      const id = userId; // Ensure userId is extracted correctly
      const notifications = await Notification.find({ userId }).populate('senderId', 'name');
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).send('Error fetching notifications');
    }
  };
  
  
  
  const acceptRequest = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).send('Notification not found');
      }
      await Request.findOneAndUpdate(
        { senderId: notification.senderId, receiverId: notification.userId },
        { status: 'Accepted' }
      );
      notification.status = 'Accepted';
      await notification.save();
      res.send('Request accepted');
    } catch (error) {
      console.error('Error accepting request:', error);
      res.status(500).send('Error accepting request');
    }
  };
  
  const rejectRequest = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).send('Notification not found');
      }
      await Request.findOneAndUpdate(
        { senderId: notification.senderId, receiverId: notification.userId },
        { status: 'Rejected' }
      );
      notification.status = 'Rejected';
      await notification.save();
      res.send('Request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
      res.status(500).send('Error rejecting request');
    }
  };
  

// Handle shortlisting a user
const shortlistUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // Example validation, ensure userId exists
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Example of updating the user document to mark as shortlisted
    await User.findByIdAndUpdate(userId, { shortlisted: true });

    res.status(200).json({ message: 'User shortlisted successfully' });
  } catch (error) {
    console.error('Error shortlisting user:', error);
    res.status(500).json({ message: 'Failed to shortlist user' });
  }
};

module.exports = {
  sendRequest,
  getNotifications,
  acceptRequest,
  rejectRequest,shortlistUser
};
