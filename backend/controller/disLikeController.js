const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Like = require('../models/likeModel'); 
const DisLike = require('../models/disLikeModel'); 

const dislikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const existingLike = await Like.findOne({ user: userId, post: postId });

  if (existingLike) {
    return res.status(400).json({ message: '이미 좋아요를 눌렀습니다.' });
  }

  const existingDislike = await DisLike.findOne({ user: userId, post: postId });

  if (existingDislike) {
    await DisLike.findOneAndDelete(existingDislike._id);

    await Post.findByIdAndUpdate(postId, {
      $pull: { disLikes: existingDislike._id },
    });

    res.status(200).json({ message: '싫어요 취소' });
  } else {
    const newDislike = new DisLike({ user: userId, post: postId });
    await newDislike.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { disLikes: newDislike._id },
    });

    res.status(201).json({ message: '싫어요' });
  }
});


module.exports = {
  dislikePost
}