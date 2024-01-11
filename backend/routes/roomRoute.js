const express = require('express');
const router = express.Router();
const {
  createRoom
} = require('../controller/roomController');
const { protect } = require('../middlewear/authmiddlewear');

router.route('/').post(protect, createRoom)

module.exports = router;