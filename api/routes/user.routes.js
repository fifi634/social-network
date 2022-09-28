const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

// Multer
const multer = require('multer');
const upload = multer();


// Authentifiaction end point
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// CRUD end-point
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// files upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil),


module.exports = router;