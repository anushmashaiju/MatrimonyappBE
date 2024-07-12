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

// Middleware to authenticate token - authMiddleware.js

/*const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['x-access-token'];
  

  if (!token) {
    return res.sendStatus(401).json({message:'unauthorized'}); // Unauthorized
  }
try{
  const decoded=jwt.verify(token, process.env.JWT_SECRET);
  req.userId=decoded.userId;
    next();
  }
catch(error){
  console.log(error);
res.sendStatus(401).json({message:'unauthorized verification'});
}
};

module.exports = authenticateToken;
*/


/*const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
  const token =authHeader && authHeader.split(' ')[1];
 if (token == null){
  return res.sendStatus(401);
 }
 jwt.verify (token,process.env.JWT_SECRET ,(err,user) =>{
  if(err){
    return res.sendStatus(403);
  }
  req.user = user;
  next()
 })
}
  

module.exports = authenticateToken;
*/