const router = require('express').Router();

// Middleware
const authController = require('../controllers/auth.controller');

// End point
router.post('/signup', authController.signUp);

module.exports = router;