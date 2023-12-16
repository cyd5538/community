const express = require('express');
const router = express.Router();
const {
  getPaginatedPosts,
  createPost,
  updatePost,
  getPostsByLikes,
  deletePost,
} = require('../controller/postController');

const { protect } = require("../middlewear/authmiddlewear");

router.route('/').post(protect, createPost).get(getPaginatedPosts);
router.route('/like').get(getPostsByLikes);
router.route('/:id').delete(protect, deletePost).patch(protect, updatePost);

module.exports = router;