const express = require('express');
const router = express.Router();

router.use('/register', handleRegistration);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
// router.post('/refresh-token', handleRefreshToken);

module.exports = router;
