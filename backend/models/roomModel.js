const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    maxMembers: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
