const multer = require('multer');


// Extension dictionary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif'
};


// Save files configuration
const storage = multer.diskStorage({  
    destination: (req, file, callback) => {
        callback(null, './uploads/post/');
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        callback(null, req.auth.userId + Date.now() + '.' + extension);
    }
});


// Check file
const upload = multer({
    storage : storage,
    limits: { fileSize: 6291456 },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/webp' &&
            file.mimetype !== 'image/gif'
        ) {
            callback(new Error('invalid file'), false);
        } else {
            callback(null, true);
        }    
    }
});


module.exports = upload.single('file');




