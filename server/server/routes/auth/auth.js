const express = require('express');
const verifyJWT = require('../../middleware/verifyJWT');
const { handleRegistration, handleLogin, handleLogout,handleGoogleCallback  } = require('../../controllers/auth/authController');
const passport = require('../../config/passportConfig');

const router = express.Router();

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.post('/logout',verifyJWT, handleLogout);
// router.post('/refresh-token', handleRefreshToken);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// this was causing error
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), handleGoogleCallback);

module.exports = router;
