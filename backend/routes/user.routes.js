const router = require('express').Router();
<<<<<<< HEAD
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// auth
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// user display: 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

=======

// Middleware
const authController = require('../controllers/auth.controller');

// End point
router.post('/signup', authController.signUp);
>>>>>>> f0e7ef2c6207c3b98fa225ebb46adbe5160caea6

module.exports = router;