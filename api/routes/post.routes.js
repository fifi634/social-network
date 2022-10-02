const router = require('express').Router();
const postController = require('../controllers/post.controller');
const likeController = require('../controllers/like.controller');
const commentController = require('../controllers/comment.controller.js');
const multerPost = require('../middleware/multerPost.middleware');


// CRUD post end-points
router.get('/', postController.readPost);
router.post('/', multerPost, postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Like end-points
router.patch('/like/:id', likeController.likePost);
router.patch('/unlike/:id', likeController.unlikePost);

// Comments end-points
router.patch('/comment/:id', commentController.commentPost);
router.patch('/edit-comment/:id', commentController.editCommentPost);
router.patch('/delete-comment/:id', commentController.deleteCommentPost);


module.exports = router;