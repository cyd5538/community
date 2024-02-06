const express = require('express');
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
} = require('../controller/commentController');

const { protect } = require("../middlewear/authmiddlewear");

router.post('/', protect, createComment);
router.patch('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);
router.post('/:commentId/like', protect, toggleLike);

module.exports = router;
