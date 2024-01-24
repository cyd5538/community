const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRooms,
  deleteRoom,
  getRoomMessages  
} = require('../controller/roomController');
const { protect } = require('../middlewear/authmiddlewear');

router.route('/').post(protect, createRoom).get(getRooms);
router.route('/:id').delete(protect, deleteRoom);
router.route('/:id/messages').get(protect, getRoomMessages);

module.exports = router;
