const multer = require('multer');
const { uploadErrors } = require('../utils/errors.utils');


// Extension dictionary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};


// Save files configuration
const storage = multer.diskStorage({    
    destination: (req, file, callback) => {
        callback(null, '../client/public/uploads/profil/');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});


// Check file
const upload = multer({
    storage : storage,
    limits: { fileSize: 83886080 },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/webp'
        ) {
            callback(new Error('invalid file'), false);
        } else {
            callback(null, true);
        }; 
    }
});


module.exports = upload.single('file');




