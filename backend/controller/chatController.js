const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const chatController = {};

chatController.saveUser = async(userName, socketId) => {
  // 닉네임으로 유저정보 찾기
  let user = await User.findOne({ nickname: userName})
  user.socketId = socketId;
  await user.save()
  return user;
}

chatController.saveChat = async(message, user) => {
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.nickname
    }
  })
  await newMessage.save()
  return newMessage
}


module.exports = chatController