const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');

const multerProfile = require('../middleware/multerProfil.middleware');
const password = require('../middleware/password.middleware');
const limiter = require('../middleware/limiter.middleware');
const { requireAuth } = require('../middleware/auth.middleware');


// Authentifiaction end point
router.post('/signup', password, authController.signup);
router.post('/login', limiter, authController.login);
router.get('/logout', authController.logout);


// CRUD end-point
router.get('/', requireAuth, userController.getAllUsers);
router.get('/:id', requireAuth, userController.userInfo);
// router.put('/:id', requireAuth, userController.updateUser);
router.patch('/', requireAuth, userController.updateUser);
// router.delete('/:id', requireAuth, userController.deleteUser);
router.delete('/', requireAuth, userController.deleteUser);


// files upload
router.post('/upload', requireAuth, multerProfile , uploadController.uploadProfil),


module.exports = router;