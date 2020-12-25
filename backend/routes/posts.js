const express = require('express');
const postsController = require('../controllers/postsController');
const tokenController = require('../controllers/tokenController');
const router = express.Router();
const multer = require('../utils/multer')

router.get('/',tokenController.verify, postsController.getAllPosts)
router.get('/post/:id',tokenController.verify, postsController.getPostById)
router.get('/:id',tokenController.verify, postsController.getAllPostsById)
router.post('/',tokenController.verify, multer, postsController.addPost)
router.delete('/:id', tokenController.verify, postsController.deletePost)

module.exports = router