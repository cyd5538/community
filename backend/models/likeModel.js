const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
});

module.exports = mongoose.model("Like", LikeSchema);