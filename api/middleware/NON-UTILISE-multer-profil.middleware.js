const multer = require('multer');
const { uploadErrors } = require('../utils/errors.utils');

// Extension dictionary
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

// (req, res) => {
//     try {
//         // Check format
//         if ( 
//             req.file.mimetype != "image/jpg" &&
//             req.file.mimetype != "image/png" &&
//             req.file.mimetype != "image/jpeg" &&
//             req.file.mimetype != "image/webp"
//         ) throw Error('invalid file');
    
//         // Check size
//         if (req.file.size > 10000000) throw Errror ("max size reached");
    
//     } catch (err) {
//         const errors = uploadErrors(err);
//         return res.status(206).json({ message: 'Upload avatar picture failed', errors, err });
//     }
// };


// Configuration object of multer
const storage = multer.diskStorage({    
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/../../client/public/uploads/profil/`);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const upload = multer({
    storage : storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == 'image/png' &&
            file.mimetype == 'image/jpg' &&
            file.mimetype == 'image/jpeg' &&
            file.mimetype == 'image/webp'

        ) {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('invalid file'))
        }
        
    }
});

module.exports = multer({ storage }).any();
// single('avatar')