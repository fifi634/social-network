const router = require('express').Router();
// Midlewares
const auth = require('../middleware/auth.middleware');
// Controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


// auth
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// user display: 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', auth, userController.userInfo);
router.post('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);


module.exports = router;