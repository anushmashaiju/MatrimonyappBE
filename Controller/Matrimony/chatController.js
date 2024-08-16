const User = require('../../Model/authModel');
const Message = require('../../Model/Matrimony/chatModel');

const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    const newMessage = new Message({
      senderId,
      receiverId,
      senderName: sender.name,
      receiverName: receiver.name,
      message,
    });

    await newMessage.save();

    req.io.to(receiverId).emit('message', {
      senderId,
      senderName: sender.name,
      message
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const getChattedUsers = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    });

    const userIds = [...new Set(messages.map(msg => msg.senderId === userId ? msg.receiverId : msg.senderId))];
    const users = await User.find({ _id: { $in: userIds } });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching chatted users:', error);
    res.status(500).json({ error: 'Failed to fetch chatted users' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getChattedUsers,
};
