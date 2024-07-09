const jwt = require('jsonwebtoken');
const User = require('../Model/authModel'); // Adjust the path as necessary
const jwtSecretKey = process.env.JWT_SECRET || 'your-jwt-secret-key';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = await User.findById(decoded.user.id).select('-password'); // Exclude the password field
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(401).json({ message: 'Invalid token!' });
  }
};

module.exports = authenticateToken;
