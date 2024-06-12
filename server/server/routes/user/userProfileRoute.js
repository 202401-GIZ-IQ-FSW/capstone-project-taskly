const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserProfile/userProfileContainer');
const { upload } = require('../../config/multer');

// - GET /api/v1/user/profile - Get user profile information
router.get('/profile', userController.getUserProfile);

// - PUT /api/v1/user/profile - Update user profile information
router.put('/profile', userController.updateUserProfile);

// - POST /api/v1/user/profile-picture - Upload a new profile picture
router.post('/profile/profile-picture', upload.single('image'), userController.uploadProfilePicture);

// - POST /api/v1/user/profile/change-password - Change user password
router.put('/profile/change-password', userController.changePassword);

module.exports = router;
