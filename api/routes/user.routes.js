const router = require('express').Router();
// Controllers
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
// Middlewares
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
router.patch('/', requireAuth, password, userController.updateUser);
router.delete('/', requireAuth, userController.deleteUser);


module.exports = router;