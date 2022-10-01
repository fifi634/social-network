const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('../middleware/multer-profil.middleware');
const { requireAuth } = require('../middleware/auth.middleware');


// Authentifiaction end point
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


// CRUD end-point
router.get('/', requireAuth, userController.getAllUsers);
router.get('/:id', requireAuth, userController.userInfo);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, userController.deleteUser);


// files upload
router.post('/upload', requireAuth, multer , uploadController.uploadProfil),


module.exports = router;