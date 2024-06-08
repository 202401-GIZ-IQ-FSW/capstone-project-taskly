const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const path = require('path');


 // - GET /api/v1/users/:userId/profile - Get user profile information
router.get('/:userId/profile', async (req, res) => {
    try {
        const userId = req.params.userId;
        const getInfo = await UserModel.findById(userId);
        if (!getInfo) {
            return res.status(404).json({ message: "User information not found" });
        }
        res.json(getInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// - PUT /api/v1/users/:userId/profile - Update user profile information
router.put('/:userId/profile', async (req, res) => {
    try {
        const userId = req.params.userId;
        const body = req.body;
        const updatedInfo = await UserModel.findByIdAndUpdate(userId, body, { new: true });
        if (!updatedInfo) {
            return res.status(404).json({ message: "User information not updated" });
        }
        res.json(updatedInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// - POST /api/v1/users/{userId}/profile-picture - Upload a new profile picture
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(__dirname, '../../images'))
        },
        filename:  function(req, file, cb){
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
        }
    });

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit
    },
    fileFilter: function(req, file, cb) {
        // Validate file types (for example, allow only images)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

router.post('/:userId/profile-picture', upload.single('image'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // save file path to user profile)
        const userId = req.params.userId;
        const imagePath = req.file.path;

        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile_picture = imagePath;
        await user.save();

        res.status(200).json({ message: 'Image updated successfully' });
    } catch (error) {
        // Handle any errors that might occur during upload
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});


module.exports = router;
