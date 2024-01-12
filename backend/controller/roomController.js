const Room = require('../models/roomModel');
const asyncHandler = require('express-async-handler');

const createRoom = asyncHandler(async (req, res) => {
  const { room, owner, maxMembers } = req.body;
  console.log(room, owner, maxMembers)
  try {
    const newRoomData = {
      room,
      owner,
      maxMembers,
    };

    const newRoom = await Room.create(newRoomData);
    res.status(201).json({ message: `${newRoom}이 생성되었습니다.`, room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

const getRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find().populate('owner', 'email _id nickname profileImage');
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});


module.exports = {
  createRoom,
  getRooms
}
