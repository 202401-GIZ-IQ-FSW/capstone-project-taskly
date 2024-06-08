const express = require('express');
const { handleRegistration, handleLogin, handleLogout } = require('../../controllers/auth/authController');
const passport = require('../../config/passportConfig');

const router = express.Router();

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
// router.post('/refresh-token', handleRefreshToken);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// this was causing error
// router.get('/google/tickets', passport.authenticate('google', { failureRedirect: '/' }), handleGoogleCallback);

module.exports = router;
