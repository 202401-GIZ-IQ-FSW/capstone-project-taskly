const express = require('express');
const router = express.Router();
const userController = require('../../controllers/UserProfile/userProfileContainer');

// - GET /api/v1/users/:userId/profile - Get user profile information
router.get('/:userId/profile', userController.getUserProfile);

// - PUT /api/v1/users/:userId/profile - Update user profile information
router.put('/:userId/profile', userController.updateUserProfile);

// - POST /api/v1/users/:userId/profile-picture - Upload a new profile picture
router.post('/:userId/profile-picture', userController.upload.single('image'), userController.uploadProfilePicture);

module.exports = router;
