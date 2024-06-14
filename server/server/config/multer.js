const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure disk storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    // Create a new folder with the username if it doesn't exist
    const username = req.user.username;
    const userFolder = path.join(__dirname, `../images/${username}`);
    fs.mkdirSync(userFolder, { recursive: true }); // Create folder recursively
    cb(null, userFolder);
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    // Always name the file as 'profile' followed by the file extension
    const extension = path.extname(file.originalname);
    const filename = `profile${extension}`;
    const username = req.user.username;
    const userFolder = path.join(__dirname, `../images/${username}`);
    const filePath = path.join(userFolder, filename);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      // If the file exists, delete it
      fs.unlinkSync(filePath);
    }

    cb(null, filename);
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

module.exports = { upload };
