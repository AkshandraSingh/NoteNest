const multer = require('multer');
const path = require('path');

const storageConfig = (destination, filenamePrefix) => multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '..', 'uploads', destination));
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        callback(null, `${filenamePrefix}_${Date.now()}${ext}`);
    }
});

const imageFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only image files are supported'));
    }
};

const profilePicUpload = multer({ storage: storageConfig('userProfilePics', 'image'), fileFilter: imageFilter });

module.exports = {
    profilePicUpload,
};
