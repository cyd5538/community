const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const disLikeSchema = new Schema({
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
},{
  timestamps : true
});

module.exports = mongoose.model("DisLike", disLikeSchema);