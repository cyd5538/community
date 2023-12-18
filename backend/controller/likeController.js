const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Like = require('../models/likeModel'); 

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const existingLike = await Like.findOne({ user: userId, post: postId });

  if (existingLike) {
    await Like.findOneAndDelete(existingLike._id);

    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: existingLike._id },
    });

    res.status(200).json({ message: '좋아요가 취소되었습니다.' });
  } else {
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: newLike._id },
    });

    res.status(201).json({ message: '좋아요가 추가되었습니다.' });
  }
});


module.exports = {
  likePost
}