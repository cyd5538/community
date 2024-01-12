const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRooms
} = require('../controller/roomController');
const { protect } = require('../middlewear/authmiddlewear');

router.route('/').post(protect, createRoom).get(getRooms);

module.exports = router;