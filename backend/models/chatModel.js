const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      name: String,
      profileImg: String
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    },
  },
{
  timestamps : true
})

module.exports = mongoose.model('Chat', chatSchema);