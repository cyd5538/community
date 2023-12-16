const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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
  text: {
    type: String,
    required: true,
  },
},{
  timestamps : true
});

module.exports = mongoose.model("Comment", CommentSchema);