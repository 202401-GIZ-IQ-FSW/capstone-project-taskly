const multer = require('multer');
const path = require('path');

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

module.exports = { upload };
