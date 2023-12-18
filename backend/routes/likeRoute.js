const express = require('express');
const router = express.Router();
const {
  likePost
} = require('../controller/likeController');

const { protect } = require("../middlewear/authmiddlewear");

router.post('/:postId/like', protect, likePost); // /posts/123/like

module.exports = router;
