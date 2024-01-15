const User = require("../models/userModel");
const Room = require("../models/roomModel");
const Chat = require('../models/chatModel');

module.exports = function(io) {
  // 말하는 함수 emit
  // 듣는 함수 on
  io.on('connection', (socket) => {
  
    // 유저 채팅방 입장
    socket.on('joinRoom', async (roomId, userId) => {
      socket.join(roomId);
      console.log(roomId, userId)
      // 사용자의 소켓 ID를 업데이트
      const user = await User.findByIdAndUpdate(userId, { socketId: socket.id });

      // 채팅방 정보
      const room = await Room.findById(roomId)
      .populate({
        path: 'owner',
        select: '_id profileImage nickname'
      })
      .populate({
        path: 'members',
        select: '_id profileImage nickname'
    });

      // 사용자에게 채팅방 정보 전송
      socket.emit('currentRoomInfo', room);
    });
  
    // 유저 채팅방 퇴장
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
    });

    // 채팅 메시지 전송
    socket.on('sendMessage', async (roomId, userId, message) => {
      try {
        const user = await User.findById(userId);
    
        if (!user) {
          console.error('유저가 없습니다.');
          return;
        }
        // 채팅 메시지 저장
        const chat = new Chat({
          chat: message,
          user: {
            id: user._id,
            name: user.name,
            profileImg: user.profileImage,
          },
          room: roomId,
        });
        
        await chat.save();
    
        // 채팅 메시지 전송
        io.to(roomId).emit('message', {
          _id: chat._id,
          __v: chat.__v,
          chat: chat.chat,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
          user: {
            id: user.id,
            name: user.nickname,
            profileImg: user.profileImage ? user.profileImage : null,
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
    
  
    // 연결이 끊길 때
    socket.on('disconnect', async () => {
      console.log('User disconnected');
  
      // 사용자의 소켓 ID를 null로 업데이트
      await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
    });
  });
}