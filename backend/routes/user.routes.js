const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


// Authentifiaction end point
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// CRUD end-point
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.post('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;