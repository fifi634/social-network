const router = require('express').Router();
const postController = require('../controllers/post.controller');

// CRUD end-Point
router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.post('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;