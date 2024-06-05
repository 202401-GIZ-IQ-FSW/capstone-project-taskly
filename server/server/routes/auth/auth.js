const express = require('express');
const { handleRegistration, handleLogin, handleLogout } = require('../../controllers/auth/authController');
const router = express.Router();

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
// router.post('/refresh-token', handleRefreshToken);

module.exports = router;
