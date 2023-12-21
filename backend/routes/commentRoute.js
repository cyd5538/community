const express = require('express');
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
} = require('../controller/commentController');

const { protect } = require("../middlewear/authmiddlewear");

router.post('/', protect, createComment);
router.patch('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);

module.exports = router;
