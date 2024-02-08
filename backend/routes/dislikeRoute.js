const express = require('express');
const router = express.Router();
const {
  dislikePost
} = require('../controller/disLikeController');

const { protect } = require("../middlewear/authmiddlewear");

router.post('/:postId/dislike', protect, dislikePost); 

module.exports = router;
