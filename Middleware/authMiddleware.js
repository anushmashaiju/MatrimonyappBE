const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Cookies:', req.cookies); // Log the cookies object
  console.log('Token:', token); // Log the token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Log the error
      return res.status(401).json({ message: 'Token expired or invalid', error: err });
    }

    console.log('Decoded token:', decoded); // Log the decoded token

    userId = decoded.id; 
    console.log('User ID:', userId); // Log the user ID

    next();
  });
};

module.exports = authenticateUser;

