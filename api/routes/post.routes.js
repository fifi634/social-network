const router = require('express').Router();
// Controllers
const postController = require('../controllers/post.controller');
const likeController = require('../controllers/like.controller');
// Middelwares
const multerPost = require('../middleware/multerPost.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

// CRUD post end-points
router.get('/', requireAuth, postController.readPost);
router.patch('/', requireAuth, multerPost, postController.createPost);
router.patch('/:id', requireAuth, postController.updatePost);
router.delete('/:id', requireAuth, postController.deletePost);

// Like end-points
router.patch('/like/:id', requireAuth, likeController.likePost);
router.patch('/unlike/:id', requireAuth, likeController.unlikePost);


module.exports = router;