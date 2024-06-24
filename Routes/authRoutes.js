const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signUp, login } = require('../Controller/authController');

router.post('/signup', signUp);
router.post('/login', login);

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

module.exports = router;
