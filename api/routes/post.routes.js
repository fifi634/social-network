const router = require('express').Router();

const postController = require('../controllers/post.controller');
const likeController = require('../controllers/like.controller');
const commentController = require('../controllers/comment.controller.js');
const uploadController = ('../controllers/upload.controller');

const multerPost = require('../middleware/multerPost.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

// CRUD post end-points
router.get('/', requireAuth, postController.readPost);
router.post('/', requireAuth, multerPost, postController.createPost);
router.patch('/:id', requireAuth, postController.updatePost);
router.delete('/:id', requireAuth, postController.deletePost);

// Like end-points
router.patch('/like/:id', requireAuth, likeController.likePost);
router.patch('/unlike/:id', requireAuth, likeController.unlikePost);

// Comments end-points
router.patch('/comment/:id', requireAuth, commentController.commentPost);
router.patch('/edit-comment/:id', requireAuth, commentController.editCommentPost);
router.patch('/delete-comment/:id', requireAuth, commentController.deleteCommentPost);

// file upload
// router.post('/upload/:id', requireAuth, multerPost, uploadController.uploadPost);

module.exports = router;