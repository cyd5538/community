const User = require("../models/userModel");
const chatController = require("../controller/chatController");

module.exports = function(io) {
  // 말하는 함수 emit
  // 듣는 함수 on
   io.on("connection", async(socket) => {
    
    // 사용자 들어옴 user socket.id에 
    socket.on('login', async(userName, cb) => {
      try {
        const user = await chatController.saveUser(userName, socket.id);
        cb({ok: true, data: user})
      } catch (error) {
        cb({ok: false ,error: error.message })
      }
    });
    
    socket.on("sendMessage", async (message, cb) => {
      try {
        // 소켓아이디로 유저 찾기
        const user = await User.findOne({socketId: socket.id});
        // 메세지 저장(찾은 유저 넣기)
        const newMessage = await chatController.saveChat(message,user);
        // io서버에 접속한 모두에게 알려줘야됨 
        io.emit("message", newMessage);
        cb({ ok: true })
      } catch (error) {
        cb({ ok: false, error: error.message })
      }
    })
   })
}