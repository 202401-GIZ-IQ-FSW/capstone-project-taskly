const UserModel = require('../../models/UserModel');
const path = require('path');

const multer = require('multer');
const { passwordValidation } = require('../../util/passwordValidation');

const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const getInfo = await UserModel.findById(userId);
    if (!getInfo) {
      return res.status(404).json({ message: 'User information not found' });
    }
    res.json(getInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, ...updateData } = req.body;

  try {
    // Check if the new username is already taken
    if (username) {
      const existingUserWithUsername = await UserModel.findOne({ username });
      if (existingUserWithUsername && existingUserWithUsername._id.toString() !== userId) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      updateData.username = username;
    }

    // Check if the new email is already taken
    if (email) {
      const existingUserWithEmail = await UserModel.findOne({ email });
      if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
      updateData.email = email;
    }

    // Update only the fields that were passed in the request body
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User information not updated' });
    }
    res.json({ message: 'User information updated sueccesfully', updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Configure disk storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    // Save files in the 'images' directory relative to the project's root
    cb(null, path.join(__dirname, '../../images'));
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a unique filename using the current date and original filename
    // Replace colons (:) in the timestamp to avoid issues in file names
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

// Create the multer upload middleware
const upload = multer({
  // Use the configured disk storage
  storage: storage,
  // Set limits for the uploaded file size (5 MB limit)
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  // Filter files to only allow image uploads
  fileFilter: function (req, file, cb) {
    // Allow only files with MIME types that start with 'image/'
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only image files are allowed')); // Reject the file
    }
  },
});

const uploadProfilePicture = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // save file path to user profile
    const userId = req.user.id;
    const imagePath = req.file.path;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = imagePath;
    await user.save();

    res.status(200).json({ message: 'Image updated successfully' });
  } catch (error) {
    // Handle any errors that might occur during upload
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    // Fetch the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if old password is correct
    const isMatch = await user.isCorrectPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    // Check if new password is the same as the old password
    const isSamePassword = await user.isCorrectPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the old password' });
    }

    // Validate new password
    if (!passwordValidation(newPassword)) {
      return res.status(400).json({ message: 'Invalid new password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  upload,
  changePassword,
};
