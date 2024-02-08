const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Like = require('../models/likeModel'); 
const DisLike = require('../models/disLikeModel'); 

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const existingDisLike = await DisLike.findOne({ user: userId, post: postId });
  if (existingDisLike) {
    return res.status(400).json({ message: '이미 싫어요를 눌렀습니다.' });
  }

  const existingLike = await Like.findOne({ user: userId, post: postId });

  if (existingLike) {
    await Like.findOneAndDelete(existingLike._id);

    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: existingLike._id },
    });

    res.status(200).json({ message: '좋아요 취소' });
  } else {
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: newLike._id },
    });

    res.status(201).json({ message: '좋아요' });
  }
});


module.exports = {
  likePost
}