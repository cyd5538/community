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

const deleteRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.id;

  try {
    const deletedRoom = await Room.findOneAndDelete(roomId);
    
    if (!deletedRoom) {
      res.status(404).json({ message: '채팅방을 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({message: `${deletedRoom.room} 방이 삭제되었습니다.`, room: deletedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

const getRoomMessages = asyncHandler(async (req, res) => {
  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId).populate({
      path: 'chats',
      options: {
        sort: { createdAt: 'desc' },
      },
      populate: {
        path: 'user',
        select: '_id nickname profileImage',
      },
    });

    if (!room) {
      res.status(404).json({ message: '채팅방을 찾을 수 없습니다.' });
      return;
    }

    const messages = room.chats.map(chat => ({
      __v: chat.__v,
      _id: chat._id,
      user: chat.user,
      chat: chat.chat,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});


module.exports = {
  createRoom,
  getRooms,
  deleteRoom,
  getRoomMessages
}
