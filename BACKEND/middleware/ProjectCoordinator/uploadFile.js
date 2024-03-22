const multer = require('multer');
const path = require('path');

// Define storage strategy
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') // Ensure this directory exists or is created on server start
    },
    filename: function(req, file, cb) {
        // Use the original file name or a timestamp for uniqueness
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage definition and file filter
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

module.exports = upload;
