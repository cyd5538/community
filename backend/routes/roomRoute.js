const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRooms,
  deleteRoom
} = require('../controller/roomController');
const { protect } = require('../middlewear/authmiddlewear');

router.route('/').post(protect, createRoom).get(getRooms);
router.route('/:id').delete(protect, deleteRoom)

module.exports = router;